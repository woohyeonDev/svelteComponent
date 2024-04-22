import { getMsNm } from '$lib/payment/serverService';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const msNo = params.msNo.toUpperCase()
    const msNm = await getMsNm(msNo)
    return {
        msNo,
        msNm
    };
}