<script setup>
import { onMounted,ref } from "vue";
import axios from "axios";


let lists = ref([]); // 创建响应式变量用于存储景点数据  

let img

const fetchImag = async () => {  
  try {  
    const response = await axios.get('http://localhost:8081/Attractions/getAttractions'); // 获取数据  
    console.log('响应', response.data);  
    lists.value = response.data; // 将返回的数据赋值给 lists  
    console.log(lists.value);
    
    let url="src/assets/picture/attraction/"
    document.querySelector('.swiper-slide').style.backgroundImage=`url(${url})`
    let list=document.querySelectorAll('.swiper-slide')
    for(let i=0;i<list.length;i++){
      list[i].style.backgroundImage=`url(${url+(i+1)+'.jpg'})`
    }
    

    
  } catch (error) {  
    console.error("出错", error);  
    alert("加载失败，请稍后再试。"); // 友好的错误提示  
  }  
};  


onMounted(() => {  
  fetchImag(); // 在挂载时调用 fetchImag 方法获取数据  
  var swiper = new Swiper(".mySwiper", {  
    spaceBetween: 30,  
    centeredSlides: true,  
    autoplay: {  
      delay: 2500,  
      disableOnInteraction: false,  
    },  
    pagination: {  
      el: ".swiper-pagination",  
      clickable: true,  
    },  
    navigation: {  
      nextEl: ".swiper-button-next",  
      prevEl: ".swiper-button-prev",  
    },  
  });  
});  




</script>

<template>
    <div class="box">
        <!-- Swiper -->
  <div class="swiper mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide"></div>
      <div class="swiper-slide"></div>
      <div class="swiper-slide"></div>
      <div class="swiper-slide"></div>
      <div class="swiper-slide"></div>
      <div class="swiper-slide"></div>
      <div class="swiper-slide"></div>
      <div class="swiper-slide"></div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
  </div>
    </div>

</template>


<style scoped>
.box{
    width: 70%;
    height: 85%;
    margin-left: 15%;
    background-color: aqua;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.37);
    background-color:white;
}

.swiper {
      width: 100%;
      height: 100%;
    }

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
</style>
