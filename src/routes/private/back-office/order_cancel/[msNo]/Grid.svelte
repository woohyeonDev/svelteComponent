
<script> 	 	
	import Magnifier from './../../../../components/svg/Magnifier.svelte';
	import LineGraph from './../../../../components/svg/LineGraph.svelte';	
    export let salesDataRows
    export let searchBillNo
    export let SALES_DATA 
    export let orderCancel   
    export let inputBillNo
   

    const headers=[
        '영수 번호',
        '거래 일시', 
        '고객명',  
        '반품 요청', 
        '반품 일시', 
        '매출 구분', 
        '총 매출액',
        '순 매출액',
        '할인',
        '포인트 사용', 
        '부가세', 
        '카드'
    ]
    const headersDetails=[
        [],
        ['거래 날짜','거래 일시'],
        [],
        [],
        ['반품 날짜','반품 시간'],
        [],
        [],
        [],
        [],
        [],
        [],
        ['카드 매출', '카드사']
    ]
    
    const colSpanCalculate = (index) =>{
        if(headersDetails[index].length){                       
            const css = 'border flex flex-nowrap justify-center items-center p-1 col-span-2'
            return css
        }
        else{
            const css = "border flex flex-nowrap justify-center items-center p-1 row-span-2 "
            return css
        }        
    }

    const openReceiptWindow = (salesData) =>{
        window.open(`./${salesData.MS_NO}/${salesData.SALE_DATE}/${salesData.BILL_NO}`,'_blank','width=420, height=630, scrollbars=yes')        
    }

    let tableHeader
	let tableBody
    
    </script>
<div class="border-[1.5px] w-4/5  border-black  " >
    <div class=" flex flex-nowrap justify-between items-center border-b-[1.5px] border-black py-[5px] bg-astems-blue text-white">         
        <div class="flex ml-4 space-x-3 font-bold">
            <div>
                <LineGraph />
            </div>
            <div>
                매출 데이터
            </div>            
        </div>
        <div class="p-1 mr-2 flex flex-nowrap justify-between items-center bg-white border border-astems-light-blue rounded  text-astems-light-blue  ">            
            <input type="text" class=" text-xs py-1 focus:outline-none"  placeholder="영수번호 4자리를 입력하세요" bind:value={inputBillNo} />                   
            <button on:click={searchBillNo}>
                <Magnifier color="#6664B0" />                 
            </button>
        </div>                                                                     
    </div>
    <div  class=" flex-none overflow-scroll  border-b border-black overflow-x-hidden  bg-astems-light-grey"  bind:this={tableHeader} >            
        <div class=" grid grid-rows-2 grid-cols-15  border-b-[1.5px]  w-[1600px] text-[12px]">               
            {#each headers as header, index }
            <span class={colSpanCalculate(index)}>{header}</span>
            {/each}
            {#each headersDetails as details }
            {#if details.length}
                {#each details as detail}
                    <div class="border text-center p-1">{detail}</div>
                {/each}
            {/if}            
            {/each}
        </div>
    </div>       
    <div class="  flex-none overflow-scroll h-[700px]"  bind:this={tableBody} on:scroll={()=>{tableHeader.scrollLeft = tableBody.scrollLeft}}>            
        <div class=" grid  grid-cols-15  w-[1600px] border striped text-[12px]">
            {#if salesDataRows}            
                {#each salesDataRows as salesData }
                <span class="border text-center p-1 ">
                    <button class="text-blue-600 underline" on:click={openReceiptWindow(salesData)}>
                        {salesData.BILL_NO}
                    </button>                    
                </span>
                <span class="border text-center p-1">{salesData.SALE_DATE}</span>
                <span class="border text-center p-1">{salesData.SALE_DTIME.substring(8,10)+":"+salesData.SALE_DTIME.substring(10,12)}</span>
                <span class="border text-center p-1">{salesData.CUST_NM||'*'}</span>
                {#if salesData.SALE_FG == '0' & salesData.CANCEL_YN == 'N'}
                <span class="border text-center flex justify-center items-center px-1">
                    <button on:mouseup={()=>{
                        SALES_DATA=salesData
                        orderCancel()
                    }} class=" bg-astems-light-blue text-white  px-3 py-[2px] rounded-xl flex justify-center items-center">
                        반 품                
                    </button>
                </span>                
                <span class="border border-as text-center p-1">-</span>
                <span class="border text-center p-1">-</span>
                <span class="border text-center p-1">정 상</span>
                <span class="border text-center p-1">{salesData.SALE_TOT.toLocaleString('ko-KR')}</span>
                <span class="border text-center p-1">{salesData.SALE_AMT.toLocaleString('ko-KR')}</span>                
                <span class="border text-center p-1">{salesData.DC_AMT.toLocaleString('ko-KR')}</span>
                <span class="border text-center p-1">{salesData.POINT_AMT.toLocaleString('ko-KR')}</span>
                <span class="border text-center p-1">{salesData.VAT_AMT.toLocaleString('ko-KR')}</span>
                <span class="border text-center p-1">{salesData.CARD_AMT.toLocaleString('ko-KR')}</span>     
                {:else if salesData.SALE_FG == '0' & salesData.CANCEL_YN == 'Y'}
                <span class="border text-center p-1">반품 완료</span>
                <span class="border text-center p-1">{salesData.CANCEL_DATE&&salesData.CANCEL_DATE.substring(0,8)}</span>
                <span class="border text-center p-1">{salesData.CANCEL_DATE&&salesData.CANCEL_DATE.substring(8,10)+":"+salesData.CANCEL_DATE.substring(10,12)}</span> 
                <span class="border text-center p-1">정 상</span> 
                <span class="border text-center p-1">{salesData.SALE_TOT.toLocaleString('ko-KR')}</span>
                <span class="border text-center p-1">{salesData.SALE_AMT.toLocaleString('ko-KR')}</span>                
                <span class="border text-center p-1">{salesData.DC_AMT.toLocaleString('ko-KR')}</span>
                <span class="border text-center p-1">{salesData.POINT_AMT.toLocaleString('ko-KR')}</span>
                <span class="border text-center p-1">{salesData.VAT_AMT.toLocaleString('ko-KR')}</span>
                <span class="border text-center p-1">{salesData.CARD_AMT.toLocaleString('ko-KR')}</span>  
                {:else if salesData.SALE_FG == '1' }
                <span class="border border-as text-center p-1">-</span>
                <span class="border text-center p-1">-</span>
                <span class="border text-center p-1">-</span>
                <span class="border text-center text-red-600 p-1">반 품</span>  
                <span class="border text-center p-1">{(salesData.SALE_TOT&&salesData.SALE_TOT*-1).toLocaleString('ko-KR')}</span>
                <span class="border text-center p-1">{(salesData.SALE_AMT&&salesData.SALE_AMT*-1).toLocaleString('ko-KR')}</span>                
                <span class="border text-center p-1">{(salesData.DC_AMT&&salesData.DC_AMT*-1).toLocaleString('ko-KR')}</span>
                <span class="border text-center p-1">{(salesData.POINT_AMT&&salesData.POINT_AMT*-1).toLocaleString('ko-KR')}</span>
                <span class="border text-center p-1">{(salesData.VAT_AMT&&salesData.VAT_AMT*-1).toLocaleString('ko-KR')}</span>
                <span class="border text-center p-1">{(salesData.CARD_AMT*-1||salesData.PAYMENT_AMT*-1).toLocaleString('ko-KR')}</span>  
                {/if}                                                          
                <span class="border text-center p-1">{salesData.CARD_NM}</span>
                {/each}
            {/if}                    
        </div>
    </div>    
</div>