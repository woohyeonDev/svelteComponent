import { json } from '@sveltejs/kit'
import { updateDidData_WKTKPPHTB } from '../../../../lib/payment/serverService'
import { getDate8 } from '../../../../lib/util/util'

export async function GET({ params }) {
	//console.log('server running')
	const MS_NO = params.msNo
	const SALE_DATE = getDate8()
	const DATA = {
		SALE_DATE,
		MS_NO
	}
	const result = await updateDidData_WKTKPPHTB(DATA)
	//console.log(result)
	console.log('DID 최신 데이터 전송',result)
	return json(result)
	// return result.length == 0
	// 	? { code: '501', message: '데이터 없음' }
	// 	: { code: '200', message: '데이터 있음', data: result }

	// const apiMap = {
	// 	didData: updateDidData_WKTKPHTB
	// }
}
