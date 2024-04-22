<script>
    import LeftArrowSvg from "../LeftArrowSVG.svelte";
    import RightArrowSvg from "../RightArrowSVG.svelte";
    import { item_opt_open_store,display_item_store,item_opt_store, order_list_store, selected_item_store, display_item_opt_store } from "./store";
    let display_item
    let item_opt
    let order_list
    item_opt_store.subscribe(v=>item_opt=v)    
    display_item_store.subscribe(v=>display_item=v)   
    order_list_store.subscribe(v=>order_list=v)
    const addItem = (item)=>{
        const display_item_opt = item_opt.filter(r=>r.GPLU_CD == item.GPLU_CD && r.PLU_CD == item.PLU_CD)
        if(display_item_opt.length){
            selected_item_store.update(()=>{return {...item, ORDER_QTY : 1, PAR_GOODS_CD: ""}})
            item_opt_open_store.update(()=>true)
            display_item_opt_store.update(()=>display_item_opt)
        }else{          
            const index = order_list.findIndex(r=>r.GOODS_CD == item.GOODS_CD)
            if(index == -1){
                order_list_store.update(v=>[...v,{...item, ORDER_QTY : 1, PAR_GOODS_CD: "",options:[]}]) 
            }else{
                order_list_store.update(v=> {
                    v[index].ORDER_QTY += 1
                    return v
                }) 
            }             
        }
    }
</script>
<div class=" h-[43vh] w-full grid grid-cols-4 grid-rows-6 bg-white  border border-collapse font-bold text-xs">
    {#each display_item as item , i }
        <button class=" border " on:click={()=>addItem(item)}>
            {item.GOODS_NM}
            <div class=" text-red-700">
                {item.DC_PRICE}
            </div>
        </button>
    {/each}
    {#each new Array(23- display_item.length) as _,i }
    <div class=" border flex justify-center items-center">
        
    </div>
    {/each}
    <div class=" border flex divide-x ">
        <button class=" flex-1  flex justify-center items-center" >
            <LeftArrowSvg />
        </button>
        <button class=" flex-1 flex justify-center items-center" >
           <RightArrowSvg />
        </button>     
    </div>
</div>