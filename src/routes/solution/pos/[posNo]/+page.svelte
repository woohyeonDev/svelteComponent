
<script lang="js">
    import Header from './Header.svelte'
    import CartList from './CartList.svelte'
    import SlipList from './SlipList.svelte';
    import Msg from './Msg.svelte'
    import PaymertInfo from './PaymertInfo.svelte';
    import Category from './Category.svelte';
    import GoodsList from './GoodsList.svelte';
    import PaymentType from './PaymentType.svelte'
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
        category_store.update(() => category_response)
        item_store.update(()=> item_response)       
        item_opt_store.update(()=>item_opt_response)
        item_opt_menu_store.update(()=>item_opt_menu_response)
        csr = true
    })     
</script>
{#if csr}
<div class=" w-full h-screen  bg-gray-100 p-1">
    <div class="flex flex-nowrap grow  h-full space-x-1">
        <div class=" flex-1 h-full space-y-1">
            <Header />
            <CartList />
            <SlipList />
            <Msg />  
            <PaymertInfo /> 
        </div>       
        <div class=" flex-1 h-full space-y-1 ">  
            <Category  />
            <GoodsList  />
            <PaymentType />
        </div>
    </div>
</div>    
{/if}

<ItemOpt />
