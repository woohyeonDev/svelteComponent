export const transformKdsData = (ORDER_DATAS,kds_config_data,template_config_data) => {		
	const transformData =[]			
	const max_stack = kds_config_data.SPLIT_SCREEN/2	
	const numberOfLinesByCol = kds_config_data.CELL_MAX_ROW	
	let page = 1
	let topStack = max_stack
	let bottomStack = max_stack
    const pushData = (orderData, stack, updateStack) => {
        /* 데이터 처리 로직 */
    };

	ORDER_DATAS.forEach((ORDER_DATA,index)=>{	
		/* 데이터 분리 로직 */
	})		
	return transformData
}
