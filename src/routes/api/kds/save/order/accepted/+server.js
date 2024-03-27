import { CREATE_SUCCESS_MESSAGE } from "$lib/constant.js";
import prisma from "$lib/dbConnection.js";
import { getDate14, getResevedDate14 } from "$lib/util.js";
import { json } from "@sveltejs/kit";
import { createOrderDetailData, createOrderHeaderData } from "../../../service/orderService.js";
import { orderSchema } from "$lib/validator.js";
import { SERVER_ERROR_MESSAGE } from "../../../lib/constant.js";

export async function POST({request}) {
    const reqData = await request.json();
    try{
        await orderSchema.validateAsync(reqData)
    }catch(error){
        return json({
            status: 400,
            message: error.message,
            ok: false,
        });
    }
    const headerData = reqData.header;    
    const detailData = reqData.detail;
    const dtime = getDate14();
    try {
        await prisma.$transaction(async (prisma) => {
            await createOrderHeaderData(prisma, headerData, dtime)
            await createOrderDetailData(prisma, detailData, dtime)
        });
        return json({
            status: 200,
            message: CREATE_SUCCESS_MESSAGE,
            ok: true,
        });
    } catch (error) {
        console.log(error);
        return json({
            status: 500,
            message: SERVER_ERROR_MESSAGE,
            ok: false,           
        });
    }
}