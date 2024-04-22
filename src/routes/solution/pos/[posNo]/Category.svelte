<script>
    import LeftArrowSvg from "../LeftArrowSVG.svelte";
    import RightArrowSvg from "../RightArrowSVG.svelte";
    import { category_store, display_item_store, item_store } from "./store";    
    let category
    let item
    category_store.subscribe(v=>category=v)
    item_store.subscribe(v=>item=v)    
</script>
<div class=" h-[16vh] w-full grid grid-cols-5 grid-rows-3 bg-[#D6DFEB]  border border-collapse font-bold text-xs">
    {#each category as cat , i }
    <button class=" border flex justify-center items-center" 
        on:click={()=>display_item_store.update(v=> {
            const result = item.filter(r=>r.GPLU_CD == cat.GPLU_CD)
            console.log(result);
            return result
        })}
    >
        {cat.GPLU_NM}
    </button>        
    {/each}
    {#each new Array(13-category.length) as _ ,i}
    <div class=" border flex justify-center items-center">
        
    </div>      
    {/each}
    <button class=" border flex justify-center items-center">      
         <LeftArrowSvg />
    </button>
    <button class=" border flex justify-center items-center">      
        <RightArrowSvg /> 
    </button>
</div>