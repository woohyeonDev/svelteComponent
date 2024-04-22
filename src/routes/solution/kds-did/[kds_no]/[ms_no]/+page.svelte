<script>
  import KdsHeader from "./KdsHeader.svelte";
  import KdsFooter from "./KdsFooter.svelte";
  import Item from "./Item.svelte";
  import { fontSizeMap } from "$lib/data";
  import { onDestroy, onMount } from "svelte";
  import { transformKdsData } from "$lib/transformer";
  import axios from "axios";
  import { page } from "$app/stores";
  import { getDate8 } from "$lib/util";
  import AstemsLogo from "../../../components/svg/AstemsLogo.svelte";
  import KdsModal from "./KdsModal.svelte";

  export let data;

  let curr_page = 1;
  let all_kds_data = [];
  let kds_data = [];
  let code_name;
  let config;
  let csr;
  let empty_span;
  let all_order_data;
  let show_modal = false;
  let reverted_data = [];
  let lastPage;
  let interval;

  const getKdsConfig = async () => {
    const response = await axios.get(
      `/api/fetch-kds-config-data?kds_no=${$page.params.kds_no}`
    );
    const result = response.data;
    if (result.ok) {
      config = result.data;
    } else {
      alert("kds 환경값을 받지 못했습니다.");
      console.log(result);
    }
  };

  const getCodeName = async () => {
    const response = await axios.get(`/api/fetch-codename-data`);
    const result = response.data;
    if (result.ok) {
      code_name = result.data;
    } else {
      alert("명칭을 받지 못했습니다.");
      console.log(result);
    }
  };

  const applyKdsConfig = (config) => {
    const gridEl = document.getElementById("grid");
    gridEl.style.gridTemplateColumns = `repeat(${
      config.kds_config_data.SPLIT_SCREEN / 2
    }, minmax(0, 1fr))`;
  };

  const getKdsOrderData = async () => {
    const SALE_DATE = config.store_config_data.SALE_DATE || getDate8();
    const post_data = {
      SALE_DATE,
    };
    const response = await axios.post(`/api/fetch-kds-order-data`, post_data);
    all_order_data = response.data;
    all_kds_data = transformKdsData(
      all_order_data,
      config.kds_config_data,
      config.template_config_data
    );
    kds_data = all_kds_data.filter(
      (ORDER_DATA) => ORDER_DATA.PAGE == curr_page
    );
    if (kds_data.length)
      lastPage = Math.max(...all_kds_data.map((ORDER_DATA) => ORDER_DATA.PAGE));
    else lastPage = 1;
    empty_span =
      Number(config.kds_config_data.SPLIT_SCREEN) -
      kds_data.reduce((a, c) => a + c.SPAN, 0);
  };

  const prepare = async (item) => {
    const post_data = {
      ORDER_UID: item.ORDER_UID,
    };
    const response = await axios.post(
      "/api/save-order-prepared-data",
      post_data
    );
    const result = response.data;
    if (result.ok) {
      alert("상태변화 성공");
      getKdsOrderData();
    } else {
      alert("상태변화 실패");
    }
  };

  const prepareAll = async () => {
    const uids = kds_data.map((r) => r.ORDER_UID);
    const unique_uids = [...new Set(uids)];
    const response = await axios.post(
      "/api/save-order-prepared-data-all",
      unique_uids
    );
    const result = response.data;
    if (result.ok) {
      alert("현재 페이지의 모든 주문이 완료되었습니다");
      await getKdsOrderData();
    } else {
      alert("오류가 발생했습니다");
    }
  };

  const prevPage = () => {
    if (curr_page == 1) return;
    curr_page -= 1;
    kds_data = all_kds_data.filter(
      (ORDER_DATA) => ORDER_DATA.PAGE == curr_page
    );
    empty_span =
      Number(config.kds_config_data.SPLIT_SCREEN) -
      kds_data.reduce((a, c) => a + c.SPAN, 0);
  };

  const nextPage = () => {
    if (curr_page == lastPage) return;
    curr_page += 1;
    kds_data = all_kds_data.filter(
      (ORDER_DATA) => ORDER_DATA.PAGE == curr_page
    );
    empty_span =
      Number(config.kds_config_data.SPLIT_SCREEN) -
      kds_data.reduce((a, c) => a + c.SPAN, 0);
  };

  const revert = async () => {
    const response = await axios.get("/api/save-order-reverted-data");
    const result = response.data;
    if (result.ok) {
      alert("복원되었습니다.");
      await getKdsOrderData();
    } else {
      alert("복원할 데이터가 없습니다.");
    }
  };

  const get_revert = async () => {
    const response = await axios.get("/api/fetch-order-reverted-data");
    const revert_result = response.data;
    if (revert_result.ok) {
      reverted_data = revert_result.data.reverted_order_data;
    } else {
      console.error("실패: reverted data:", revert_result.message);
    }
  };

  const revert_list = async () => {
    show_modal = false;
    await get_revert();
    show_modal = true;
  };

  const applyKeyInput = () => {
    document.onkeyup = async function (e) {
      switch (e.key) {
        case "0":
          await prepareAll();
          break;
        case "r":
          await revert();
          break;
        case "<":
          prevPage();
          break;
        case ">":
          nextPage();
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          const selected_item = kds_data.find((r) => r.INDEX + 1 == e.key);
          if (selected_item) prepare(selected_item);
          break;
        default:
          break;
      }
    };
  };

  onMount(async () => {
    await getKdsConfig();
    await getCodeName();
    csr = true;
    await getKdsOrderData();
    applyKdsConfig(config);
    applyKeyInput();
    interval = setInterval(
      () => {
        getKdsOrderData();
      },
      Number(config.kds_config_data.REFRESH_INTERVAL) * 1000
    );
  });
  onDestroy(() => {
    clearInterval(interval);
  });
</script>

{#if csr}
  <KdsModal {show_modal} {reverted_data} {code_name} {config} />
  <div class="w-full h-screen flex flex-wrap bg-[#040404]">
    <KdsHeader
      store_config_data={config.store_config_data}
      kds_config_data={config.kds_config_data}
      {curr_page}
      {prevPage}
      {nextPage}
      {revert}
      {revert_list}
      {lastPage}
    />
    <KdsBody 
    config  
    bind:kds_data  
    empty_span 
    {prepare}    
    />
    {#if config.template_config_data.SUMMARY_USE_YN == "Y"}
      <Summary kds_data />
    {/if}
    <KdsFooter
      template_channel_data={config.template_channel_data}
      template_config_data={config.template_config_data}
      {code_name}
    />
  </div>
{/if}
