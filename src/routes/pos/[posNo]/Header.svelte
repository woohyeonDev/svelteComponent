<script>
    import { page } from "$app/stores";
</script>
<div class=" flex h-[12vh] bg-[#11283D] space-x-2 mx-1 ">
    <div class=" w-[40%] flex justify-center items-center space-x-1 ">
        <img class=" w-[140px]" src="/logo.png" alt="">
        <div class=" flex text-[0.8rem] text-center text-white font-bold pt-1 ">
            <div>
                매출등록
            </div>                        
        </div>                    
    </div>
    <div class=" w-[26%] grid grid-cols-1 grid-rows-3 text-white py-2  text-[0.6rem]">
        
        <div class=" flex items-center ">
            <div class="flex-1">
                - 통신상태
            </div>
            <div class=" h-[2.5vh] flex-1 bg-gray-50 bg-opacity-20 flex justify-center items-center">
                정상
            </div>
        </div> 

        <div class=" flex items-center ">
            <div class="flex-1">
                - 포스번호
            </div>
            <div class=" h-[2.5vh] flex-1 bg-gray-50 bg-opacity-20 flex justify-center items-center">
                {$page.params.pos_no}
            </div>
        </div> 

        <div class=" flex items-center">
            <div class="flex-1">
                - 영수증번호
            </div>
            <div class="  h-[2.5vh] flex-1 bg-gray-50 bg-opacity-20">
            </div>
        </div> 

    </div>                 
   
</div> 