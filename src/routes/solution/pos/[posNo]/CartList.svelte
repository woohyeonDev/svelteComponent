<script>
    import { order_list_store } from "./store";
    let order_list = []
    order_list_store.subscribe(v=>order_list=v)    
</script>

<div class=" h-[32vh] bg-white border-2 border-gray-200  text-[0.8rem] rounded ">
    <div class=" grid grid-cols-12  divide-x-2 border-b-2 border-gray-200 pr-4 bg-gray-100">
        <div class=" col-span-4 bg-gray-100 flex justify-center items-center font-bold ">
            상품명
        </div>
        <div class=" col-span-1 bg-gray-100 flex justify-center items-center font-bold ">
            속성
        </div >
        <div class=" col-span-1 bg-gray-100 flex justify-center items-center font-bold ">
            수량
        </div>
        <div class=" col-span-2 bg-gray-100 flex justify-center items-center font-bold "> 
            정가
        </div>
        <div class=" col-span-2 bg-gray-100 flex justify-center items-center font-bold ">
            할인금액
        </div>
        <div class=" col-span-2 bg-gray-100 flex justify-center items-center font-bold ">
            금액
        </div>
    </div>
    <div class=" grid grid-cols-12 divide-y max-h-[29vh] overflow-y-scroll ">                    
        {#each order_list as item,i }
        {#if item.PAR_GOODS_CD}
        <div class=" col-span-4  flex items-center font-bold px-4 ">
            ▶ {item.SUB_MENU_NM}
        </div>
        {:else}
        <div class=" col-span-4  flex  items-center font-bold px-2">
            {item.GOODS_NM}
        </div>
        {/if}

        <div class=" col-span-1  flex justify-center items-center font-bold ">
            
        </div >
        <div class=" col-span-1 flex justify-center items-center font-bold ">
            {item.ORDER_QTY||1}
        </div>
        <div class=" col-span-2 flex justify-center items-center font-bold "> 
            {item.UPRICE || item.UPCHARGE_UPRICE}
        </div>
        <div class=" col-span-2  flex justify-center items-center font-bold ">
            {item.DC_UPRICE }
        </div>
        <div class=" col-span-2 flex justify-center items-center font-bold ">
            {item.DC_PRICE}
        </div>
        {/each}
    </div>
</div>