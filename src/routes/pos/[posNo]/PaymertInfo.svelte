<script>
    import { order_list_store } from "./store";
    let order_list
    order_list_store.subscribe(v=>order_list=v)
    
 
</script>

<div class=" h-[39vh] flex flex-nowrap  space-x-1 font-bold m-1">   
    <div class="  flex-1 grid grid-cols-3 grid-rows-[8] bg-white text-[1rem]">
        <div class=" col-span-1 flex justify-between items-center px-2">
            <div>총</div><div>수</div><div>량 :</div>                         
        </div>
        <div class=" col-span-2 flex justify-end px-2 items-center">                      
            {order_list.reduce((a,c)=>a+(c.ORDER_QTY||0),0) }                        
        </div>
        <div class=" col-span-1 flex justify-between items-center px-2">
            <div>총</div><div>매</div><div>출</div><div>액 :</div>                        
        </div>
        <div class=" col-span-2 flex justify-end px-2 items-center">                        
            {order_list.reduce((a,c)=>a+(Number(c.UPRICE)||Number(c.UPCHARGE_UPRICE)),0) }                       
        </div>
        <div class=" col-span-1 flex justify-between items-center px-2">
            <div>할</div><div>인</div><div>금</div><div>액 :</div>                        
        </div>
        <div class=" col-span-2 flex justify-end px-2 items-center">                        
            {order_list.reduce((a,c)=>a+(Number(c.DC_UPRICE)),0) }                       
        </div>
        <div class=" col-span-1 flex justify-between items-center px-2">
            <div>부</div><div>가</div><div>세 :</div>                         
        </div>
        <div class=" col-span-2 flex justify-end px-2 items-center">                      
            {0}                        
        </div>
        <div class=" col-span-1 flex justify-between items-center px-2 text-[#064687]">
            <div>받</div><div>을</div><div>금</div><div>액 :</div>                        
        </div>
        <div class=" col-span-2 flex justify-end px-2 items-center">                        
            {order_list.reduce((a,c)=>a+(Number(c.DC_PRICE)),0)}                       
        </div>
        <div class=" col-span-1 flex justify-between items-center px-2">
            <div>받</div><div>은</div><div>금</div><div>액 :</div>                        
        </div>
        <div class=" col-span-2 flex justify-end px-2 items-center">                        
           {0}                       
        </div>
        <div class=" col-span-1 flex justify-between items-center px-2">
            <div>거</div><div>스</div><div>름</div><div>돈 :</div>                        
        </div>
        <div class=" col-span-2 flex justify-end px-2 items-center">                        
            {0}                        
        </div>
        <div class=" col-span-1 flex justify-between items-center px-2 text-[0.8rem]">
            <div>V</div><div>E</div><div>R</div><div>S</div><div>I</div><div>O</div><div>N :</div>                        
        </div>
        <div class=" col-span-2 flex justify-end px-2 items-center">                        
            1.0.0                        
        </div>  
    </div>

    <div class=" col-span-2 flex-1 space-y-1">
        <div class=" h-[6vh] bg-white" >
        </div>
        <div class=" h-[32.4vh] text-white text-[2rem] font-thin grid grid-cols-3 divide-inherit  divide-x-2 divide-y-2 bg-[#38465E] ">
            <button class=" border-l-2 border-t-2">1</button>
            <button >2</button>
            <button >3</button>
            <button >4</button>
            <button >5</button>
            <button >6</button>
            <button >7</button>
            <button >8</button>
            <button >9</button>                    
            <button >0</button>
            <button >00</button>
            <button class=" bg-[#11283D] flex items-center justify-center px-2 pr-1" >
                <svg fill="#ffffff"  viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M12 14L14 12M14 12L16 10M14 12L12 10M14 12L16 14M3 12L9.41421 18.4142C9.78929 18.7893 10.298 19 10.8284 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H10.8284C10.298 5 9.78929 5.21071 9.41421 5.58579L3 12Z" stroke="#11283D" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
            </button> 
        </div>
    </div>
</div>