import { authToken } from '$lib/util/resetToken'

/** @type {import('./$types').PageLoad} */
export async function load(event) {
    return { imgHost: process.env.IMG_HOST ? process.env.IMG_HOST+ '/upload_file/kiosk_temp/' :  '/upload_file/kiosk_temp/', ...authToken(event).data }
    // return { imgHost: process.env.IMG_HOST === undefined ? "" : process.env.IMG_HOST, ...authToken(event).data }
}
