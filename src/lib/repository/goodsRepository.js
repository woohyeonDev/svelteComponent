import { fetch } from '$lib/oracle/oracleUtil';
export default class goodsRepository {
    constructor() { }

    static async findMaxSeq (obj){
        const query = ` 
            SELECT /*+ INDEX_DESC(ssgoodtb ssgoodx0) */
            ...
        `;
        const binds = {
            v_ms_no: obj.msNo
        };
        return await fetch(query, binds)
    }

    static async findAllMaster (obj){
        const query = ` 
        SELECT NVL(SUBSTRB(goods_cd, 1, 13), ' ') as goods_cd         --상품코드                       : 13
            ...
        `;
        const binds = {
            v_ms_no: obj.msNo
        };
        return await fetch(query, binds)
    } 
    
    static async findSeqMaster (obj){
        const query = ` 
            SELECT NVL(proc_fg, 'A')
                NVL(SUBSTRB(goods_cd, 1, 13), ' ') as goods_cd                     --상품코드                       : 13
                , SUBSTRB(NVL(GOODS_NM        , ' '),1,30) as goods_nm    --상품명                         : 30
            ...
        `;
        const binds = {
            v_ms_no: obj.msNo,
            v_log_seq: obj.lastSeq
        };
        return await fetch(query, binds)
    }  
}