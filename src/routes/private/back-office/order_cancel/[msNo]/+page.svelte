<script>	  
	import axios from 'axios'
	import { onMount } from 'svelte'	
	import StoreInfo from './StoreInfo.svelte'
    import DataSearch from './DataSearch.svelte'
	import Grid from './Grid.svelte'
    /** @type {import('./$types').PageData} */
    export let data;
    
    let now = new Date();
    let year = now.getFullYear();		//	this is the month & year displayed
    let month = now.getMonth()
    let date = now.getDate()    
    let saleMonth = "0"+(month+1)
    let saleDay =  "0"+date      
    let salesDate
    salesDate = year +saleMonth.substring(saleMonth.length-2)+saleDay.substring(saleDay.length-2)

    let allSalesDataRows
    let salesDataRows
    let msNo = data.msNo
    let msNm = data.msNm 
    let inputBillNo
    let SALES_DATA   
    let isNormal = true
    let isCancel = true

    const updateSalesDataRows = async ()=> {
        const response = await axios.get(`/private/order_cancel/${msNo}/${salesDate}`)
        allSalesDataRows = response.data.rows
        salesDataRows= allSalesDataRows       
        inputBillNo =''       
    }

    const searchSalesDataRow = async () =>{
        const response = await axios.get(`/private/order_cancel/${msNo}/${salesDate}`)
        allSalesDataRows = response.data.rows         
        if(isNormal & isCancel) salesDataRows = allSalesDataRows            
        else if(!isNormal & isCancel)salesDataRows= allSalesDataRows.filter(row=> row.SALE_FG=='1' | row.CANCEL_YN=='Y')
        else if(isNormal & !isCancel)salesDataRows= allSalesDataRows.filter(row=>row.SALE_FG!=='1'& row.CANCEL_YN=='N') 
        else salesDataRows = []                      
    }

    const searchBillNo =()=>{        
        if(inputBillNo)salesDataRows = allSalesDataRows.filter(row=>row.BILL_NO==inputBillNo)
        else salesDataRows = allSalesDataRows        
    }

    const orderCancel = async()=>{
        if(!confirm('주문을 취소하시겠습니까?')) return;
        const response = await axios.post(`/private/order_cancel/${msNo}/${salesDate}`,{SALES_DATA})        
        if(response.data.bSucc=='succ'){ 
            alert('주문 취소에 성공하였습니다.') 
            await updateSalesDataRows()
        }  
        else return alert("주문 취소에 실패하였습니다.");  
                      
    }    

    onMount(async()=>{
        await updateSalesDataRows()
    })
     
</script>
<div class="flex flex-nowrap w-full h-[800px]  mt-10">
    <div class=" mr-5 h-[800px]">
        <StoreInfo {msNm} {msNo} />       
        <DataSearch {searchSalesDataRow} {salesDataRows}/>          
    </div>      
    <Grid {searchBillNo} bind:inputBillNo {orderCancel} {salesDataRows} bind:SALES_DATA />   
</div>







