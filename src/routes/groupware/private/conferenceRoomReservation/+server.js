import { json } from '@sveltejs/kit'
import { getConnection, options } from '../../../lib/oracle/config'
import { getAccessCookie } from '$lib/auth/jwt'
import { getDate14 } from '../../../lib/utils/date';
import OracleDB from 'oracledb';

import { fetch, execute } from '$lib/oracle/oracleUtil';


// /api/newsletter GET

export async function GET({ url } ) {	
	const salesDate = url.searchParams.get('saleDate');
	const nativeQuery = {
		query:`
		`
		,
		binds: {	
		}
	}	
    const result = await fetch(nativeQuery.query, nativeQuery.binds)
    return json(result)  
}

export async function POST({ request, cookies } ) {	
	const user_info =  await getAccessCookie(cookies)		
	const req = await request.clone().json();	
	const date14 = getDate14() 
    const getSeqQuery = {
        query:`
        `,
        binds:{            
        }
    }
    const r1 = await fetch(getSeqQuery.query, getSeqQuery.binds)
    const seq = r1[0]?.SEQ||"0"
    const nextSeq = (Number(seq) + 1).toString().padStart(2,"0")
	const nativeQuery = {
		query:`
		`
		,
		binds: {	
			
		}
	}				
    const r2 = await execute(nativeQuery.query, nativeQuery.binds)  
    return json({r2})  
}

export async function DELETE({ url } ) {		
	const param = url.searchParams.get('selection');
    const RESERVE_DATE = url.searchParams.get('RESERVE_DATE');	
    const data = JSON.parse(param)
    const seqList = data.join(',');
	const nativeQuery = {
		query:`
        `
		,
		binds: {}
	}				
	const r1 = await execute(nativeQuery.query, nativeQuery.binds)
    return json({r1})
}


export async function PUT({ request, cookies } ) {	
	const user_info =  await getAccessCookie(cookies)		
	const req = await request.clone().json();   
	const date14 = getDate14() 
  	const nativeQuery = {
		query:`
		`
		,
		binds: {				
		}
	}			
    const r1 = await execute(nativeQuery.query, nativeQuery.binds, options)
    return json({r1})  
}