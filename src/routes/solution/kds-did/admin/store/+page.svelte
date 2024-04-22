<script lang="js">
  import { onMount } from "svelte";
  import axios from "axios";

  let store_config_data;
  let channel_name_data = {};
  let csr = false;
  const save = async () => {
    const response = await axios.post("/api/save-admin-store-data", {
      store_config_data,
      channel_name_data,
    });
    const result = response.data;
    if (result.ok) alert("저장되었습니다");
    else {
      console.log(result);
      alert("저장에 실패했습니다.");
    }
  };
  const fetchConfigData = async () => {
    const response = await axios.get("/api/fetch-admin-store-data");
    const result = response.data;
    if (result.ok) {
      store_config_data = result.data.store_config_data;
      channel_name_data = result.data.channel_name_data;
    } else console.log(result);
  };
  onMount(async () => {
    await fetchConfigData();
    csr = true;
  });
</script>

{#if csr}
  <form on:submit|preventDefault={save}>
    <div class=" w-full flex h-[50px] items-center border-b px-8 select-none">
      <div class="flex items-center justify-between h-7 space-x-2 w-full">
        <div class="flex">
          <div class="flex items-center font-bold text-20px">매장 관리</div>
        </div>
        <div class=" flex">
          <button
            type="submit"
            class=" bg-stone-700 px-2 py-1 text-white font-bold rounded-md"
          >
            저장
          </button>
        </div>
      </div>
    </div>

    <div class="w-full px-10 pt-6 select-none">
      <div class=" w-full flex justify-center mb-5">
        <div class=" w-full flex items-center space-x-2">
          <div class=" w-[4px] h-[12px] bg-primary-800" />
          <div class=" font-bold">매장정보</div>
        </div>
      </div>
      <div class="grid grid-cols-6 border-collapse border">
        <div class=" bg-primary-100 text-center py-1 border">매장이름</div>
        <div class=" border col-span-2 flex items-center">
          <input
            name="MS_NM"
            type="text"
            class="rounded border w-full mx-2 hover:ring-1 ring-stone-200 focus:outline-1 outline-stone-300"
            bind:value={store_config_data.MS_NM}
            required
          />
        </div>
        <div class=" bg-primary-100 text-center py-1 border">판매일자</div>
        <div class=" border col-span-2 flex items-center">
          <input
            name="SALE_DATE"
            type="text"
            pattern="[0-9]{'{'}8}"
            class="rounded border w-full mx-2 hover:ring-1 ring-stone-200 focus:outline-1 outline-stone-300"
            bind:value={store_config_data.SALE_DATE}
          />
        </div>
        <div class=" bg-primary-100 text-center py-1 border">
          데이터 저장기간
        </div>
        <div class=" border col-span-2 flex items-center">
          <input
            name="RETENTION_PERIOD"
            type="text"
            class="rounded border w-full mx-2 hover:ring-1 ring-stone-200 focus:outline-1 outline-stone-300"
            pattern="[0-9]{'{'}1,3}"
            bind:value={store_config_data.RETENTION_PERIOD}
            required
          />
        </div>
      </div>
    </div>

    <div class="w-full px-10 pt-6 select-none">
      <div class=" w-full flex justify-center mb-5">
        <div class=" w-full flex items-center space-x-2">
          <div class=" w-[4px] h-[12px] bg-primary-800" />
          <div class=" font-bold">주문 채널 정보</div>
        </div>
      </div>
    </div>

    <div class="w-full px-10 select-none">
      <div class="grid grid-cols-6 border-collapse border">
        {#each channel_name_data as channel, index}
          <div class=" bg-primary-100 text-center py-1 border">
            {channel.CODE_NM}
          </div>
          <div class=" border col-span-2 flex items-center">
            <input
              name="ch[]"
              type="text"
              class="rounded border w-full mx-2 hover:ring-1 ring-stone-200 focus:outline-1 outline-stone-300"
              bind:value={channel_name_data[index].CODE_SNM}
            />
          </div>
        {/each}
      </div>
    </div>
  </form>
{/if}
