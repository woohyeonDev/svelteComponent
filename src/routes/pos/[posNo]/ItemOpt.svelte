<script>
  import LeftArrowSvg from "../LeftArrowSVG.svelte";
  import RightArrowSvg from "../RightArrowSVG.svelte";
  import { item_opt_open_store, display_item_opt_store, selected_item_store, selected_item_opt_menu_store, display_item_opt_menu_store , item_opt_menu_store, order_list_store } from "./store";
  let item_opt_open 
  let display_item_opt
  let display_item_opt_menu
  let selected_item
  let selected_item_opt_menu
  let item_opt_menu
  item_opt_open_store.subscribe(v=>item_opt_open = v)  
  display_item_opt_store.subscribe(v=>display_item_opt=v) 
  display_item_opt_menu_store.subscribe(v=>display_item_opt_menu=v)
  selected_item_store.subscribe(v=>selected_item=v)  
  selected_item_opt_menu_store.subscribe(v=>selected_item_opt_menu=v)
  item_opt_menu_store.subscribe(v=>item_opt_menu=v)
  const selectItemOpt = (item_opt)=>{      
          display_item_opt_menu_store.update(()=>item_opt_menu.filter(r=>r.SUB_GROUP_CD == item_opt.SUB_GROUP_CD))
  }
  const addItemOptMenu = (item_opt_menu)=>{      
    const index = selected_item_opt_menu.findIndex(r=>r.GOODS_CD == item_opt_menu.GOODS_CD)
    if(index == -1){
      selected_item_opt_menu_store.update(v=>[...v,{...item_opt_menu, PAR_GOODS_CD: selected_item.GOODS_CD, ORDER_QTY:1}]) 
    }else{
      selected_item_opt_menu_store.update(v=> {
        v[index].ORDER_QTY += 1
        return v
      }) 
    }           
  }
  const addOrderList = ()=>{
    order_list_store.update((v)=>
      [
        ...v,
        selected_item,
        ...selected_item_opt_menu
      ]
    )
  }
    
  </script>
  
  {#if item_opt_open}
    <div class="fixed inset-0 bg-gray-500 bg-opacity-50">
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-lg">
        <div class=" w-[60vw] h-[80vh] bg-white">

          <div class=" w-full h-[8vh] flex justify-between items-center text-white bg-primary-700 font-bold text-[1.8rem] px-[2vw]">
            <div>
              부가메뉴
            </div>
            <button on:click={()=>{
                addOrderList()
                item_opt_open_store.update(v=>false)
                selected_item_store.update(()=>[])
                selected_item_opt_menu_store.update(()=>[])

              }}>X</button>
          </div>    

          <div class=" flex  p-[1vw]">
            <div class=" flex-1">
              <div class=" h-[40vh] bg-white border-2 border-gray-200  text-[0.8rem] rounded mx-1">
                <div class=" grid grid-cols-12  divide-x-2 border-b-2 border-gray-200 pr-4 bg-gray-100 ">
                    <div class=" col-span-4 bg-gray-100 flex justify-center items-center font-bold ">
                        상품명
                    </div>
                    <div class=" col-span-1 bg-gray-100 flex justify-center items-center font-bold ">
                        속성
                    </div >
                    <div class=" col-span-1 bg-gray-100 flex justify-center items-center font-bold ">
                        수량
                    </div>
                    <div class=" col-span-2 bg-gray-100 flex justify-center items-center font-bold "> 
                        금액
                    </div>
                    <div class=" col-span-2 bg-gray-100 flex justify-center items-center font-bold ">
                        할인금액
                    </div>
                    <div class=" col-span-2 bg-gray-100 flex justify-center items-center font-bold  ">
                        재고
                    </div>
                </div>
                <div class=" grid grid-cols-12 divide-y overflow-y-scroll text-xs">                 
                  <div class=" col-span-4  flex justify-center items-center font-bold ">
                      {selected_item.GOODS_NM}
                  </div>
                  <div class=" col-span-1  flex justify-center items-center font-bold ">
                      
                  </div >
                  <div class=" col-span-1 flex justify-center items-center font-bold ">
                      {selected_item.ORDER_QTY}
                  </div>
                  <div class=" col-span-2 flex justify-center items-center font-bold "> 
                      {selected_item.DC_PRICE + selected_item.DC_UPRICE}
                  </div>
                  <div class=" col-span-2  flex justify-center items-center font-bold ">
                      {selected_item.DC_UPRICE}
                  </div>
                  <div class=" col-span-2 flex justify-center items-center font-bold ">
                      
                  </div>
                  {#each selected_item_opt_menu as opt, i}
                  <div class=" col-span-4  flex justify-center items-center font-bold ">
                    ▶ {opt.SUB_MENU_NM}
                  </div>
                  <div class=" col-span-1  flex justify-center items-center font-bold ">
                      
                  </div >
                  <div class=" col-span-1 flex justify-center items-center font-bold ">
                      {opt.ORDER_QTY||1}
                  </div>
                  <div class=" col-span-2 flex justify-center items-center font-bold "> 
                      {opt.UPCHARGE_UPRICE}
                  </div>
                  <div class=" col-span-2  flex justify-center items-center font-bold ">
                      {opt.DC_UPRICE}
                  </div>
                  <div class=" col-span-2 flex justify-center items-center font-bold ">
                      
                  </div>                    
                  {/each}                 
                </div>
            </div>

            </div>
            <div class="w-full flex-1 space-y-4">

              <div class=" h-[12vh] w-full grid grid-cols-4 grid-rows-2 bg-[#D6DFEB]  border border-collapse font-bold">
                {#each display_item_opt as item_opt , i }
                <button class=" border" on:click={()=>selectItemOpt(item_opt)}>                      
                    {item_opt.SUB_GROUP_NM}
                    <div>

                    </div>
                    
                </button>
              {/each}
                {#each new Array(7 - display_item_opt.length) as _ ,i}
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

              <div class=" h-[26vh] w-full grid grid-cols-4 grid-rows-4 bg-white  border border-collapse font-bold text-sm" >
                {#each display_item_opt_menu as item_opt_menu , i }
                <button class=" border" on:click={()=>addItemOptMenu(item_opt_menu)}>                      
                  {item_opt_menu.SUB_MENU_NM}
                  <div>

                  </div>                      
                </button>
                {/each}
                {#each new Array(15-display_item_opt_menu.length ) as _ ,i}
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

            </div>

            
            
          </div>

        </div>        
      </div>
    </div>
  {/if}
