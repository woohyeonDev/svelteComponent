
<script lang="js">
    import LeftHeader from './LeftHeader.svelte'
    import LeftItemList from './LeftItemList.svelte'
    import LeftSlipList from './LeftSlipList.svelte';
    import LeftMsg from './LeftMsg.svelte'
    import LeftFooter from './LeftFooter.svelte';
    import RightTopGrid from './RightTopGrid.svelte';
    import RightMidGrid from './RightMidGrid.svelte';
    import RightBottomGrid from './RightBottomGrid.svelte'
    import axios from 'axios';
    import { onMount } from 'svelte';
    import ItemOpt from './ItemOpt.svelte';
    import { category_store, item_opt_menu_store, item_opt_store, item_store } from './store';
    let csr = false
    let category    
    let item       
    let item_opt      
    category_store.subscribe(v=>category=v)
    item_store.subscribe(v=>item=v)
    item_opt_store.subscribe(v=>item_opt=v)
    console.log(item_opt);
    onMount(async()=>{
        const [
            category_response,
            item_response,
            item_opt_response,
            item_opt_menu_response
        ] = await Promise.all([
            axios.get(`/api/atpos/fetch/category`),
            axios.get(`/api/atpos/fetch/item`),
            axios.get(`/api/atpos/fetch/item-opt`),
            axios.get(`/api/atpos/fetch/item-opt-menu`),
        ])          
        const category_result = category_response.data
        const item_result = item_response.data        
        const item_opt_result = item_opt_response.data
        const item_opt_menu_result = item_opt_menu_response.data
        category_store.update(() => category_result.data)
        item_store.update(()=> item_result.data)       
        item_opt_store.update(()=>item_opt_result.data)
        item_opt_menu_store.update(()=>item_opt_menu_result.data)
        csr = true
    })     
</script>
{#if csr}
<div class=" w-full h-screen  bg-gray-100 p-1">
    <div class="flex flex-nowrap grow  h-full space-x-1">
        <div class=" flex-1 h-full space-y-1">
            <LeftHeader />
            <LeftItemList />
            <LeftSlipList />
            <LeftMsg />  
            <LeftFooter /> 
        </div>       
        <div class=" flex-1 h-full space-y-1 ">  
            <RightTopGrid  />
            <RightMidGrid  />
            <RightBottomGrid />
        </div>
    </div>
</div>    
{/if}

<ItemOpt />
