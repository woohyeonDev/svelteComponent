import { json } from '@sveltejs/kit';
import {makeErrorResponse, makeTelexHeader} from '$lib/util/serverUtil';
import { parameterSchema } from '$lib/validation/parameter';
import goodsService from '$lib/service/goodsService';
/**
 * @type {import('./$types').RequestHandler}
 * 상품 마스터 M10S
 * @param {RequestHandler} event
 * @param {string} event.params.msNo
 * @param {string} event.params.posNo
 * @param {string} event.params.lastSeq
 * @returns {object}
 * 
 * @author 정우현
 * @date 2024-03-20
 */
export const GET = async (event) => {
    const telexId = 'M10S'
    const obj = await event.params
    try{
        await parameterSchema.validateAsync(obj)        
    }catch(error){
        const errorResponse = makeErrorResponse(400, error)
        return json(errorResponse)
    }  
    try {        
        const maxSeq = await goodsService.getMaxSeq(obj)
        const goodsMaster = obj.lastSeq == 'all' 
        ? await goodsService.getAllMaster(obj)
        : await goodsService.getSeqMaster(obj)           
        const response = makeTelexHeader(telexId, maxSeq, goodsMaster)
        return json(response)
    } catch(error){
        const errorResponse = makeErrorResponse(500, error)
        return json(errorResponse)
    }    
}