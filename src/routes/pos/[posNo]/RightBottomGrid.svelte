<script>
  import { getDate14, getDate8 } from "$lib/util";
  import axios from "axios";
  import { order_list_store } from "./store";
  import { page } from "$app/stores";  

  let order_list;
  const pos_no = $page.params.pos_no;
  const NOMAL = "00";
  const CANCEL = "01";
  const EAT_IN = "00";
  const PICK_UP = "01";
  const DELIVERY = "02";
  const POS = "00";
  const KIOSK = "01";
  const JINGERBELL = "02";
  const DRIVETHRU = "03";
  order_list_store.subscribe((v) => (order_list = v));
  const cardPayment = async (
    ORDER_FG,
    ORDER_TYPE,
    ORDER_POS_TYPE,
    ORDER_RESERVED_TIME = null
  ) => {
    if (order_list.length == 0) return alert("상품을 선택하세요");
    const ORDER_DATA = {};
    /* 주문 데이터 생성 로직 */
    const res = await axios.post("/api/save-order-accepted-data", ORDER_DATA);
    result = res.data;
    if (result.ok) {
      order_list_store.update((v) => []);
      return alert("결제가 되었습니다.");
    } else {
      return alert("결제에 실패했습니다.");
    }
  };
  const vcat =  async ()=>{
    // const post_data = {
    //   PROC_CODE: "A01",
    //   WORK_CODE: "0100",
    //   INS_MON: "00"
    // }
    // const response = await axios.post('/api/atpos/vcat/set', post_data)
    // console.log(response);    
    // await printer()
  }
  const printer =  async ()=>{
    const post_data = {
      PROC_CODE: "A01",
      WORK_CODE: "0100",
      INS_MON: "00"
    }
    const response = await axios.post('/api/atpos/printer', post_data)
    console.log(response);    
  }
</script>

<div class=" h-[39vh] w-full grid grid-cols-5 grid-rows-5 gap-1 text-xs font-bold">
  <button
    class=" border bg-white"
    on:click={() => cardPayment(NOMAL, EAT_IN, POS)}
  >
    POS(매장)
  </button>
  <button
    class=" border bg-white"
    on:click={() => cardPayment(NOMAL, EAT_IN, KIOSK)}
  >
    KIOSK(매장)
  </button>
  <button
    class=" border bg-white"
    on:click={() => cardPayment(NOMAL, DELIVERY, JINGERBELL)}
  >
    징거벨
  </button>
  <button
    class=" border bg-white"
    on:click={() => cardPayment(NOMAL, PICK_UP, DRIVETHRU)}
  >
    D-THRU
  </button>
  <button
    class=" border bg-white"
    on:click={() => cardPayment(CANCEL, EAT_IN, KIOSK)}
  >
    취소주문b
  </button>
  <button
    class=" border bg-white"
    on:click={() => cardPayment(NOMAL, PICK_UP, POS)}
  >
    POS(포장)
  </button>
  <button
    class=" border bg-white"
    on:click={() => cardPayment(NOMAL, PICK_UP, KIOSK)}
  >
    KIOSK(포장)
  </button>
  <button
    class=" border bg-white"
    on:click={() => cardPayment(NOMAL, PICK_UP, JINGERBELL, 15)}
  >
    징거벨(포장)
  </button>
  <div class=" border bg-white"></div>
  <button
    class=" col-span-2 row-span-2 border bg-[#055192] flex justify-center items-center text-[2rem] font-bold text-white"
    on:click={vcat}
  >
    카드
  </button>
  <div class=" border bg-white justify-center items-center"></div>
  <div
    class=" col-span-2 row-span-2 border bg-[#055192] flex justify-center items-center text-[2rem] font-bold text-white"
  >
    현금
  </div>
  <div class=" border bg-white"></div>
  <div class=" border bg-white"></div>
  <div class=" border bg-white"></div>
  <div class=" border bg-white"></div>
  <div class=" border bg-white"></div>
  <div class=" border bg-white"></div>
</div>
