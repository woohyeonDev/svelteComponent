<script>
	import { generateSam } from './../../lib/payment/clientProcess.js'
	import { browser } from '$app/environment'   
    import {goPage} from '$lib/util/util'
	import { rollbackCartList } from '../../lib/order/clientService.js'

    /** @type {import('./$types').ActionData} */
    export let form
    let serverDataJson = JSON.stringify(form)
    let serverData = JSON.parse(serverDataJson)     
    
    const callPayForm = async ()=>{        
        if(!serverData.Ret_URL) {           
            await rollbackCartList()                
            return goPage('/cart')            
        }                
        const PayUrl = document.order_info.PayUrl.value
        document.order_info.action = PayUrl.substring(0,PayUrl.lastIndexOf("/")) + "/jsp/encodingFilter/encodingFilter.jsp"
        document.order_info.submit()        
    }     
    const checkPay = async () =>{        
        self.name = "tar_opener"       
        const salesData = JSON.parse(serverData.salesDataJson)
        const payForm = document.pay_form               
        const sam = await generateSam(salesData)
        const samJson = JSON.stringify(sam)                                      
        payForm.samJson.value = samJson          
        payForm.submit() 
    } 
    const payController = async () =>{        
        if(!serverData.enc_info) return callPayForm()
        else if(serverData.res_cd=='0000') return checkPay()
        else {            
            await rollbackCartList()            
            return goPage('/cart')
        }
    }
    if(browser)payController();       
</script>
<form  name="order_info" method="post" >                           
    <input type="hidden" name="ordr_idxx"       value={serverData.ordr_idxx} >                           
    <input type="hidden" name="good_name"       value={serverData.good_name} >                             
    <input type="hidden" name="good_mny"        value={serverData.good_mny} >     
    <input type="hidden" name="req_tx"          value={serverData.req_tx} />              <!-- 요청 구분 -->
    <input type="hidden" name="shop_name"       value={serverData.shop_name} />        <!-- 사이트 이름 --> 
    <input type="hidden" name="site_cd"         value={serverData.site_cd}>    <!-- 사이트 코드 -->
    <input type="hidden" name="currency"        value={serverData.currency}/>               <!-- 통화 코드 -->
    <!-- 인증시 필요한 파라미터(변경불가)-->
    <input type="hidden" name="escw_used"       value={serverData.escw_used} />
    <input type="hidden" name="pay_method"      value={serverData.pay_method} />
    <input type="hidden" name="ActionResult"    value={serverData.ActionResult} />
    <input type="hidden" name="van_code"        value={serverData.van_code} />
    <!-- 신용카드 설정 -->
    <input type="hidden" name="quotaopt"        value={serverData.quotopt}/> <!-- 최대 할부개월수 -->
    <!-- 가상계좌 설정 -->
    <input type="hidden" name="ipgm_date"       value={serverData.ipgm_date} />
    <!-- 리턴 URL (kcp와 통신후 결제를 요청할 수 있는 암호화 데이터를 전송 받을 가맹점의 주문페이지 URL) -->
    <input type="hidden" name="Ret_URL"         value={serverData.Ret_URL} />
    <!-- 화면 크기조정 -->
    <input type="hidden" name="tablet_size"     value={serverData.tablet_size} />
    <!-- 추가 파라미터 ( 가맹점에서 별도의 값전달시 param_opt 를 사용하여 값 전달 ) -->
    <input type="hidden" name="param_opt_1"     value={serverData.param_opt_1} />    
    <!-- 거래등록 응답값 -->
    <input type="hidden" name="approval_key"    value={serverData.approval_key}/>
    <input type="hidden" name="traceNo"         value={serverData.traceNo} />
    <input type="hidden" name="PayUrl"          value={serverData.PayUrl} />
    <!-- 인증창 호출 시 한글깨질 경우 encoding 처리 추가 (**인코딩 네임은 대문자) -->
    <input type="hidden" name="encoding_trans" value="UTF-8" /> 
</form>
<form name="pay_form" method="post" action="../kcp_api_pay" >
    <input type="hidden" name="req_tx"         value={serverData.req_tx} />               <!-- 요청 구분          -->
    <input type="hidden" name="res_cd"         value={serverData.res_cd} />               <!-- 결과 코드          -->
    <input type="hidden" name="site_cd"        value={serverData.site_cd} />              <!-- 사이트 코드      -->
    <input type="hidden" name="tran_cd"        value={serverData.tran_cd} />              <!-- 트랜잭션 코드      -->
    <input type="hidden" name="ordr_idxx"      value={serverData.ordr_idxx} />            <!-- 주문번호           -->
    <input type="hidden" name="good_mny"       value={serverData.good_mny} />             <!-- 휴대폰 결제금액    -->
    <input type="hidden" name="good_name"      value={serverData.good_name} />            <!-- 상품명             -->
    <input type="hidden" name="enc_info"       value={serverData.enc_info} />    
    <input type="hidden" name="enc_data"       value={serverData.enc_data} />
    <input type="hidden" name="use_pay_method" value={serverData.use_pay_method} />
    <input type="hidden" name="cash_yn"        value={serverData.cash_yn||''} />              <!-- 현금영수증 등록여부-->
    <input type="hidden" name="cash_tr_code"   value={serverData.cash_tr_code||''} />
    <!-- 추가 파라미터 -->
    <input type="hidden" name="salesDataJson"  value={serverData.salesDataJson}    />       
    <input type="hidden" name="samJson"        value=""    />    
</form>