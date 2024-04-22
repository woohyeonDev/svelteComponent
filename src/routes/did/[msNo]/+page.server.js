/** @type {import('./$types').PageLoad} */
export async function load( event ) {     
    const WS_URL = process.env.WS_URL
    return { 
         WS_URL, 
    }    
}