<script >
	import axios from "axios";
    import ConferenceRoomList from './ConferenceRoomList.svelte';
    import CustomDatePicker from './CustomDatePicker.svelte';
    import { onMount } from "svelte";
	import {getDate8} from "$lib/utils/date.js"
	export let data
	let salesDate = getDate8()
	let conferenceRoomA // 회의실 A (영업/SI전용)
	let conferenceRoomB // 대회의실
	let conferenceRoomC // 회의실B (SM/경영지원)
	let conferenceRoomD // 접견실A
	let conferenceRoomE // 접견실B

	const getDailyConferenceRoomReservedData = async () =>{
		const response = await axios.get(`./conferenceRoomReservation?saleDate=${salesDate}`)
		const res_data = response.data
		conferenceRoomA = res_data.filter(r => r.PLACE_FG === '1');
		conferenceRoomB = res_data.filter(r => r.PLACE_FG === '2');
		conferenceRoomC = res_data.filter(r => r.PLACE_FG === '3');
		conferenceRoomD = res_data.filter(r => r.PLACE_FG === '4');
		conferenceRoomE = res_data.filter(r => r.PLACE_FG === '5');
		console.log('getDailyConferenceRoomReservedData',conferenceRoomA);
	}	

	onMount(async () => {
		await getDailyConferenceRoomReservedData()
		console.log(data);
	})
</script>


<CustomDatePicker bind:salesDate {getDailyConferenceRoomReservedData}/>
{#if conferenceRoomA }
<ConferenceRoomList 
	title='회의실 A (영업/SI전용)' 
	userId={data.USER_ID} 
	data={conferenceRoomA} 
	place_fg="1" 
	maxPerson = 16
	{salesDate} 
	{getDailyConferenceRoomReservedData}
/>
{/if}
{#if conferenceRoomB }
<ConferenceRoomList 
	title='대회의실' 
	userId={data.USER_ID} 
	data={conferenceRoomB} 
	place_fg="2" 
	maxPerson = 20
	{salesDate} 
	{getDailyConferenceRoomReservedData}
/>
{/if}
{#if conferenceRoomC }
<ConferenceRoomList 
	title='회의실B (SM/경영지원)' 
	userId={data.USER_ID} 
	data={conferenceRoomC} 
	place_fg="3" 
	maxPerson = 16
	{salesDate} 
	{getDailyConferenceRoomReservedData}
/>
{/if}
{#if conferenceRoomD }
<ConferenceRoomList 
	title='접견실A' 
	userId={data.USER_ID} 
	data={conferenceRoomD}  
	place_fg="4" 
	maxPerson = 8
	{salesDate} 
	{getDailyConferenceRoomReservedData}
/>
{/if}
{#if conferenceRoomE }
<ConferenceRoomList 
	title='접견실B' 
	userId={data.USER_ID} 
	data={conferenceRoomE}  
	place_fg="5" 
	maxPerson = 8
	{salesDate} 
	{getDailyConferenceRoomReservedData}
/>
{/if}
