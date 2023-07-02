<script lang="ts">
  import { slide } from 'svelte/transition';
  let main_menus : Array<string> = ['link1','category1','category2' ]
  let sub_menus: Array<Array<string>> = [[],['sub1','sub2','sub3','sub2','sub3','sub2','sub3','sub2','sub3','sub2','sub3'],['sub4','sub5']]
  let main_menus_visble : boolean = false
  let sub_menus_visble : boolean = false
  let curr_index: number
  async function delay(ms:number) {
  await new Promise(resolve => setTimeout(resolve, ms));
  }
  const mouseOverTest = ()=>{
    main_menus_visble = true   
  }
  const mouseLeaveTest =async ()=>{
    sub_menus_visble = false
    await delay(200); // 2초 동안 대기    
    main_menus_visble = false
       
  }
  const mainMenuClick = (index: number) =>{
    if(!curr_index ){
      sub_menus_visble = true
      curr_index = index 
    }else if(curr_index == index ) {
        sub_menus_visble = !sub_menus_visble
    }
    else if(sub_menus_visble) {
      curr_index = index 
    }
    else {
      sub_menus_visble = !sub_menus_visble
      curr_index = index 
    }   
  }
</script>
<div 
  class="
    p-3 
    group/nav 
    bg-white 
    min-h-screen 
    w-fit 
    select-none
   " 
  role='button' 
  on:mouseover={mouseOverTest} 
  on:mouseleave={mouseLeaveTest} 
  on:focus
  tabindex='-1'>
  {#each main_menus as main_menu, i}
     <button class="flex space-x-2 "  >
        <div>
          #
        </div>
        {#if main_menus_visble}
        <button class=" " transition:slide={{delay : 0, duration : 400 , axis :'x'}} on:click={()=>{mainMenuClick(i)}}>
          {main_menu}
        </button>           
        {/if}
        {#if sub_menus[i].length !==0}
        <div>
          ▼
        </div>
        {/if}                      
     </button>  
      {#if sub_menus_visble 
      && sub_menus[i].length !==0 
      && curr_index === i}
      <div transition:slide={{delay : 0, duration : 300 , axis :'y'}}>
        {#each sub_menus[i] as item}
          <div class="w-full ml-5">
          {item}
          </div>
        {/each} 
      </div>                  
      {/if}   
  {/each}
</div>

