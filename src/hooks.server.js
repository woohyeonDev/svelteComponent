import { redirect , RequestEvent } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks'
import { SECRET_API_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { getConnection } from '$lib/oracle/config'
import cryptoJs from 'crypto-js'
import oracledb from 'oracledb'

const first= async ({ event, resolve }) => {  
  // Protect any routes under /authenticated
  if (event.url.pathname.startsWith("/authenticated")) {    
    const refreshCookie = event.cookies.get('refreshCookie')      
    const accessCookie = event.cookies.get('accessCookie')
    if (!refreshCookie) {
      resetCookie(event)      
      throw redirect(303, "/");
    }
    if (!accessCookie) {      
      const { user_id } = jwt.verify( refreshCookie, SECRET_API_KEY )      
      const native_query = {
        query: `
        SELECT  EI.EMP_NO,
        ...
        `       
          ,
          binds: {
              USER_ID: { dir: oracledb.BIND_IN, val: user_id, type: oracledb.STRING },            
          },
      }
      const options = { outFormat: oracledb.OUT_FORMAT_OBJECT, autoCommit: false, batchErrors: true }  
      const conn = await getConnection()      
      const result = await conn.execute(native_query.query, native_query.binds, options)    
      await conn.release()
      if (result.rows.length == 0) {
        resetCookie(event)
        console.log('로그인 정보 없음');
        throw redirect(307, '/')
      }
      const emp_info = result.rows[0]
      const accessToken = jwt.sign(
          {
              type: 'JWT',
              ...emp_info
          },
          SECRET_API_KEY,
          {
              expiresIn: '30m', // 만료시간
              issuer: 'astems'  // 발행자
          }
      );
      event.cookies.set('accessCookie', accessToken , accessCookieOption)            
    }   
  } 
  return resolve(event);
}

const second   = async ( { event, resolve })=>{   
    const result = await resolve(event);   
    return result;
} 

export const handle = sequence(first, second)


const resetCookie =( event ) => {
  event.cookies.set('accessToken', "", { maxAge: 0 })
  event.cookies.set('refreshToken', "", { maxAge: 0 })
}

const accessCookieOption = {
  path: '/',
  httpOnly: true,
  // only requests from same site can send cookies
  // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
  sameSite: "strict" ,
  secure: false,
  maxAge: 60 * 30
}
