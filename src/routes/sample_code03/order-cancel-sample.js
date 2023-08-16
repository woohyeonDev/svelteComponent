
//일부 코드만 올립니다
export const processOrderCancle = async (SALES_DATA) => {
    console.log(SALES_DATA);
    SALES_DATA = await generateDetailData(SALES_DATA)
    SALES_DATA = await generateSlipData(SALES_DATA)
    SALES_DATA = await generatePromotionData(SALES_DATA)
    SALES_DATA = transformToCancelData(SALES_DATA)
    SALES_DATA = await synchronizeBillNo(SALES_DATA)    
    const result = orderCancel_map[SALES_DATA.SLIP.VAN_CD](SALES_DATA)
    if (result.code == '500') return { bSucc: 'false', msg: '결제 취소에 실패 하였습니다.'}
    
    const updateOrderCancelQueryBinds_STRNHDTB = getUpdateOrderCancelQueryBinds_STRNHDTB(SALES_DATA.HEADER)    
    const insertOrderCancelQueryBinds_STRNHDTB = getInsertOrderCancelQueryBinds_STRNHDTB(SALES_DATA.HEADER)
    const insertOrderCancelQueryBinds_SLIP = getInsertOrderCancelQueryBinds_SLIP(SALES_DATA)
    const insertOrderCancelQueryBinds_STRNDTTB = getInsertOrderCancelQueryBinds_STRNDTTB(SALES_DATA)
    const insertKitchenPrinterQueryBinds_WKKPRTB = getInsertKitchenPrinterQueryBinds_WKKPRTB(SALES_DATA.HEADER)   
    const connection = await getConnection()
    try {
        await connection.execute(updateOrderCancelQueryBinds_STRNHDTB.query, updateOrderCancelQueryBinds_STRNHDTB.binds, options)
        await connection.execute(insertOrderCancelQueryBinds_STRNHDTB.query, insertOrderCancelQueryBinds_STRNHDTB.binds, options)
        await connection.execute(insertOrderCancelQueryBinds_SLIP.query, insertOrderCancelQueryBinds_SLIP.binds, options)
        await connection.execute(insertKitchenPrinterQueryBinds_WKKPRTB.query, insertKitchenPrinterQueryBinds_WKKPRTB.binds, options)
        if (SALES_DATA.HEADER.NORM_DC_AMT) {
            const insertOrderCancelQueryBinds_STRNPMTB = getInsertOrderCancelQueryBinds_STRNPMTB(SALES_DATA.PROMOTION)
            await connection.execute(insertOrderCancelQueryBinds_STRNPMTB.query, insertOrderCancelQueryBinds_STRNPMTB.binds, options)
        }   
        const detailResult = await connection.executeMany(insertOrderCancelQueryBinds_STRNDTTB.query, insertOrderCancelQueryBinds_STRNDTTB.binds, options)                     
        if (detailResult.rowsAffected > 0 && detailResult.batchErrors === undefined) {
            // 디테일 insert 성공 시
            console.log(`method : 매출 취소 처리 성공`)
            return {                
                SALES_DATA,
                bSucc: 'succ',            
            }
        }
        else {
            // 디테일 insert 실패 시
            console.log('method : 매출 취소 처리 실패')
            console.log(detailResult.batchErrors)
            connection.rollback()
            return {                
                SALES_DATA,
                bSucc: 'false',            
            }
        }         
    } catch (e) {
        console.log('method : 매출 취소 처리 실패')
        console.log(` // ${e.name}: ${e.message}`)
        connection.rollback();        
        return {            
            SALES_DATA,
            bSucc: 'false',            
        }
    } finally {        
        connection.commit()
        connection.release()
        console.log("ORDER_CANCEL_SALES_DATA")
        console.log(SALES_DATA)
    }   
}  


const orderCancel_kcp = async (SALES_DATA) => {
    const certData = await getPgCertData_PGCERTTB(SALES_DATA.HEADER.MS_NO,'14')
    const KCP_CERT_INFO = certData.CERT_INFO1.replace(/\r?\n/g, '')
    const KCP_PRIKEY_PKCS8 = certData.CERT_INFO2
    const password = certData.CERT_INFO3
    const pgMaster = await getPgMaster(SALES_DATA.HEADER.MS_NO)
    let site_cd = pgMaster.catId
    let tno = SALES_DATA.SLIP.TNO
    let mod_type = 'STSC'

    let cancel_sign_data = site_cd + '^' + tno + '^' + mod_type;
    let kcp_sign_data = make_sign_data(cancel_sign_data, KCP_PRIKEY_PKCS8, password)

    let req_data = {
        site_cd : site_cd,
        tno : tno,
        kcp_cert_info : KCP_CERT_INFO,
        kcp_sign_data : kcp_sign_data,
        mod_type : mod_type,
        mod_desc : '가맹점 DB 처리 실패(자동취소)'
    };

    const response =  await fetch("https://stg-spl.kcp.co.kr/gw/mod/v1/cancel", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(req_data),
    })
    const res_data = await response.json()    
    if (res_data.res_cd == '0000') return json({ code: 200, message: '주문이 취소되었습니다.' })
    return json({code:500, msg:'주문 취소 실패'})
    
}

const orderCancel_nice = async (SALES_DATA) => {
    const certData = await getPgCertData_PGCERTTB(SALES_DATA.HEADER.MS_NO,'16') 
    const merchantID = certData.CERT_INFO1
    const merchantKey = certData.CERT_INFO2
    const moid = 'astems_web_kiosk'
    let ediDate = getDate14();
    const cancelReqData = {
        TID: SALES_DATA.SLIP.TNO,
        MID: merchantID,
        Moid: moid,
        CancelAmt: SALES_DATA.HEADER.CARD_AMT,
        CancelMsg:'order cancel req',
        PartialCancelCode:'0',//0:전체 취소 1:부분 취소
        EdiDate: ediDate,
        SignData: getSignData(merchantID + SALES_DATA.HEADER.CARD_AMT + ediDate + merchantKey).toString(),
        NetCancelURL: 'https://webapi.nicepay.co.kr/webapi/cancel_process.jsp'
    }    

    const cancelResData = await cancelRequest(cancelReqData)
    console.log("nice_pay_cancel res ")
    console.log(cancelResData)
    if (cancelResData.ResultCode === '2001') return { code: 200, message: '주문이 취소되었습니다.' }
    else return {code:500, msg:'주문 취소 실패'} 
}

export const make_sign_data = (serverData, KCP_PRIKEY_PKCS8, password) => {
    // 개인키 READ
    // "splPrikeyPKCS8.pem" 은 테스트용 개인키
    // "changeit" 은 테스트용 개인키비밀번호
    // const rootDirectory = process.cwd()
    // const pemDirectory = path.join(rootDirectory, 'src/certificate/splPrikeyPKCS8.pem')
    // let key_file = fs.readFileSync(pemDirectory).toString();    
    let key_file = KCP_PRIKEY_PKCS8;      
    // 서명데이터생성
    return crypto.createSign('sha256').update(serverData).sign({
        format: 'pem',
        key: key_file,
        passphrase: password
    }, 'base64');
}

async function cancelRequest(data){
    try {
        const response = await fetch(data.NetCancelURL, {
            method: 'POST',
            headers: {
                'User-Agent': 'Super Agent/0.0.1',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'TID': data.TID, 
                'MID': data.MID, 
                'Moid': data.Moid, 
                'CancelAmt': data.CancelAmt,
                'CancelMsg': data.CancelMsg,
                'PartialCancelCode': data.PartialCancelCode,
                'EdiDate': data.EdiDate,
                'SignData': data.SignData,
            })
        });
        // const body = await response.buffer();
        // const strContents = iconv.decode(body, 'EUC-KR');
        // const returnObj = JSON.parse(strContents);
        const arrayBuffer = await response.arrayBuffer();        
        const strContents = new TextDecoder("utf-8").decode(new Uint8Array(arrayBuffer));
        const returnObj = JSON.parse(strContents);        
        return returnObj
        // 필요한 경우 서명 유효성 검증 수행
    } catch (error) {
        console.error(error);
    }
}

const getSignData=(data)=>{
    const encrypted = SHA256(data)
    return encrypted
}

const orderCancel_map = {
    '14': orderCancel_kcp,
    '16': orderCancel_nice
}