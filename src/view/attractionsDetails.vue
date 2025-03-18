<template>
  <div class="attraction-detail">
    <h1 class="attraction-title">{{ attraction.name }}</h1>
    <div class="attraction-meta">
      <span>创建时间: {{ attraction.created_at }}&nbsp&nbsp&nbsp&nbsp</span>
      <span>更新时间: {{ attraction.updated_at }}&nbsp&nbsp&nbsp&nbsp;</span>
      <span>所在地区: {{ attraction.location }}</span>
    </div>
    <div class="attraction-content">
      <div class="attraction-image">
        <img class="attractionImage" :src="'src/assets/picture/attraction/'+attraction.attraction_id+'.jpg'" alt="景点图片" />
      </div>
      <div class="attraction-info">
        <h2>相关信息</h2>
        <p><strong>开放时间:</strong> {{ attraction.opening_hours }}</p>
        <p><strong>交通信息:</strong> {{ attraction.transportation }}</p>
        <p><strong>景点描述:</strong> {{ attraction.message }}</p>
      </div>
    </div>
    <div class="related-figures">
      <h2>相关名人</h2>
      <div class="figures-list">
        <div v-for="figure in relatedFigures" :key="figure.person_id" class="figure" @click="toFamousPeople">
          <img :src="'src/assets/picture/famousPeople/'+figure.person_id+'.jpg'" alt="名人图片" />
          <div class="figure-info">
            <h3>{{ figure.name }}</h3>
            <p>{{ figure.message }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="likes-line">
      <LikeButton></LikeButton>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CommentsArea from '../components/CommentsArea.vue';
import LikeButton from '../components/LikeButton.vue';
import router from '../router';
import useAttractionStore from '../stores/attrations';
import { storeToRefs } from 'pinia';

import axios from 'axios';

let attractionStore=storeToRefs(useAttractionStore())

console.log(attractionStore.attractionsId.value);



const attraction_id = attractionStore.attractionsId.value; 



let attraction=ref({});

const fetchAttractions=async()=>{

  try {
    
     
    const url = `http://localhost:8081/Attractions/${attraction_id}`; // 拼接 URL  
    const response = await axios.get(url);  
  
     attraction.value = response.data.data;
     console.log(document.querySelector('.attractionImage'));
     
      
     console.log('响应景点', attraction.value); 


  } catch (error) {
     console.error("出错", error);  
    alert("加载失败，请稍后再试。"); // 友好的错误提示  
    
  }


}


let relatedFigures=ref([]);


const fetchrelatedFigures=async()=>{

  try {
    
    
    const url = `http://localhost:8081/FamousPeople/${attraction_id}`; // 拼接 URL  
    const response = await axios.get(url);  
  
     relatedFigures.value = response.data;
     console.log('响应名人', relatedFigures.value); 


  } catch (error) {
     console.error("出错", error);  
    alert("加载失败，请稍后再试。"); // 友好的错误提示  
    
  }


}

onMounted(()=>{
  fetchAttractions(),
  fetchrelatedFigures()
});


</script>

<style scoped>
.attraction-detail {
  max-width: 85%;
  margin: auto;
  padding: 20px;
}

.attraction-title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 10px;
}

.attraction-meta {
  text-align: center;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 20px;
}

.attraction-content {
  display: flex;
  margin-bottom: 20px;
}

.attraction-image img {
  width: 600px;
  height: 400PX;
  border-radius: 8px;
}

.attraction-info {
  text-align: left;
  margin-left: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.attraction-info:hover {
  transform: scale(1.02);
}

.related-figures {
  max-width: 100%;
  /* 设置最大宽度 */
  margin: 0 auto;
  /* 上下边距为 0，左右边距自动，居中 */
  text-align: center;
  /* 标题和文本居中 */
  padding: 20px;
  /* 内边距 */
  background-color: #f9f9f9;
  /* 背景颜色，可选 */
  border-radius: 8px;
  /* 圆角边框 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
}

.figures-list {
  display: flex;
  /* 使用弹性布局 */
  flex-wrap: wrap;
  /* 允许换行 */
  justify-content:space-around;
  /* 水平居中子项目 */
  gap: auto;
  /* 子项目之间的间隔 */
}

.figure {
  flex: 0 1 200px;
  /* 根据屏幕宽度调整占用空间 */
  text-align: center;
  /* 名字和介绍文本居中 */
  cursor: pointer;
}

.figure img {
  max-width: 100%;
  /* 图片宽度适应容器 */
  height: auto;
  /* 高度自动 */
  border-radius: 50%;
  /* 头像圆形 */
}

.figure-info h3 {
  margin: 10px 0 5px;
  /* 上边距10px，下边距5px */
  font-size: 1.2em;
  /* 增大标题字体 */
  color: #333;
  /* 标题颜色 */
}

.figure-info p {
  color: #666;
  /* 描述文本颜色 */
  font-size: 0.9em;
  /* 描述文本大小 */
  width: 500px;
}

.likes-line {
  text-align: center;
  margin-top: 20px;
}
</style>