<script>
	import NavBar from '../../components/ui/NavBar.svelte'	
	import OrderInfo from "./OrderInfo.svelte"
	import CategoryBar from "./CategoryBar.svelte"	
	import GoodsList from './GoodsList.svelte'
	import { getMsNm, getStoreInfomation } from '../../lib/order/clientService'
	import CookieModal from '$com/ui/CookieModal.svelte'
	import { onMount } from 'svelte'

	/** 이미지 호스트 */
	/** @type {import('./$types').PageData} */
    export let data	
	
	let activeMenu

	let storeInformation
	let TBL_GROUP_CD
	onMount(async()=>{
		storeInformation = await getStoreInfomation()
		TBL_GROUP_CD = storeInformation.TBL_GROUP_CD || undefined
	})	


</script>
<div class="  w-full flex justify-center">
	{#await getMsNm()}
	<!---->
	{:then msNm}
	<NavBar prevPage="/main" title={msNm}   titleColor="" desc="" useHome={false} {storeInformation} {TBL_GROUP_CD}/>	
	<CategoryBar bind:activeMenu />
	<GoodsList activeMenu={activeMenu} imgHost={data.imgHost} />
	<OrderInfo />
	<CookieModal showModal={!data.user}/>
	{/await}
</div>


