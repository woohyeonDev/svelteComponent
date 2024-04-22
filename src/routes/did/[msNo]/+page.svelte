<script>
	import { page } from '$app/stores'	
	import { onDestroy, onMount } from 'svelte'
	import { getDate8 } from '../../../../lib/util/util'
	import axios from 'axios'
	let orderListCookBefore = [] //준비 중
	let orderListCookDone = [] //완료
	let orderListRecentCook //가장 최근 완료
	let showingCookDoneList = [] //최근 요리 완료된 7개
	

	// export let data
	const MAX_ORDER_COUNT = 7 // 최대 주문 갯수

	const updateDID = async (didData) => {		
		// const DID_data = makingOrderNum(didData)		
		const res = await axios.get(`/private/DID/${$page.params.msNo.toUpperCase()}`)
		const DID_data = makingOrderNum(res.data)
		orderListCookBefore = DID_data.filter((r) => r.PROC_FG == '0' || r.PROC_FG == '1')
		orderListCookDone = DID_data
			.filter((r) => r.PROC_FG == '2')
			.sort(function(a,b){ return b.COMPLETION_DTIME - a.COMPLETION_DTIME})
		if(orderListCookDone.length < 7 )showingCookDoneList = orderListCookDone
		else showingCookDoneList = orderListCookDone.slice(0,7)
		orderListRecentCook = showingCookDoneList[0]
	}

	const makingOrderNum = (didData) =>{
		return	didData.map((r) => {
			if (r.POS_NO <= '59') {
				r.ORDER_NO = r.POS_NO[1] + r.BILL_NO.substring(2)
				return r
			}
			else if (r.POS_NO == '60') {
				r.ORDER_NO = String((Number(r.BILL_NO) % 1000) + 1000)
				return r
			} else {
				const posNo = Number(r.POS_NO)
				const billNo = Number(r.BILL_NO) % 200				
				r.ORDER_NO = 2000 + billNo + ((posNo-61)*200)
				return r
			}
		})	
	}
	let interval
	let socket
	let MS_NO
	onMount(async () => {
		MS_NO = $page.params.msNo.toUpperCase() 
		await updateDID()
		interval = setInterval(async () =>{
			updateDID()
		},5000)
		// socket = new WebSocket('ws://localhost:7777');
		// socket = new WebSocket(data.WS_URL);
		// socket.addEventListener('open', function (event) {
		// 	socket.send(`${MS_NO}|connection|did`)
		// 	socket.addEventListener('message', async function (event) {				
		// 		const message = event.data;		
		// 		const didData = JSON.parse(message)
		// 		console.log('didData',didData);
		// 		console.log('xxx');
		// 		await updateDID(didData);
		// 	})			
		// })	
	})
	onDestroy(async()=>{
		clearInterval(interval)
	})
</script>
<div class="wrap">
	<div class="main-container">
		<div class="mian-header">
			<div class="guide-text" style="color:#fff">주문하신 메뉴가 나왔습니다</div>
			{#if orderListRecentCook}
				<div class="big-done-num">
					<div class="mark">
						<div class="top">NEW</div>
						<svg viewBox="0 0 67 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 17V0H33.5H67V17L33.5 0L0 17Z" fill="#E9A800" />
						</svg>
					</div>
					<div class="num">{orderListRecentCook.ORDER_NO}</div>
				</div>
			{/if}
		</div>
		<div class="main-body">
			{#each showingCookDoneList as doneList, index}
				{#if index !== 0}
					<div class="small-done-num">{doneList.ORDER_NO}</div>
				{/if}
			{/each}
		</div>
	</div>
	<div class="sub-container">
		<div class="sub-header">
			<div class="guide-text" style="border-right:0;">주문하신 메뉴가 준비중입니다</div>
		</div>
		<div class="sub-body">
			{#each orderListCookBefore as beforeList}
				<div class="prepare-num">{beforeList.ORDER_NO}</div>
			{/each}
		</div>
	</div>
</div>


