<script setup>
import Carousel from '../components/Carousel.vue';
import { ref } from 'vue';

let attractionLists = ref([
  {
    id: "景点 1",
    pic: "https://via.placeholder.com/200", // 替换为实际图片的URL  
    message: "这是第一个景点的描述，介绍该景点的特点和历史。",
  },
  {
    id: "景点 2",
    pic: "https://via.placeholder.com/200", // 替换为实际图片的URL  
    message: "这是第二个景点的描述，介绍它的魅力和吸引点。",
  },
  {
    id: "景点 3",
    pic: "https://via.placeholder.com/200", // 替换为实际图片的URL  
    message: "第三个景点的介绍，包含它的特殊之处和游玩的建议。",
  },
])
</script>

<template>
  <div class="main">
  </div>
  <div class="attraction-list">
    <Carousel></Carousel>
  </div>
</template>

<style scoped>
.main img {
  width: 100%;
}


.attraction-list {
  max-width: 95%;
  margin: auto;
  text-align: center;
  height: 795px;
  padding-top: 3%;
  box-sizing: border-box;
}

.index_tail {
  width: 100%;
  height: 70px;
  background-color: #3adcae;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-style: italic;
  color: white;
  margin-top: 20px;
  text-align: center;
  line-height: 70px;
  border-bottom: 4px solid rgb(85, 127, 204);
}
</style>