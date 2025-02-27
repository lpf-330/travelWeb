<script setup>
import { defineProps } from 'vue';
import router from '../router';

// 接收父组件传来的 showLists 属性  
let props = defineProps({
  showType: {
    type: String,
    required: true
  },
  showLists: {
    type: Array,
    required: true, // 这是一个必需的属性  
  },
});



let goToDetail = (ShowList) => {
  // // 这里可以添加跳转到详情页面的逻辑  
  // console.log('跳转到详情页面，ID：', id);
  
  let data=JSON.stringify({id:ShowList.id}) 

  router.push({
    path:"/index/" + props.showType,
    state:{data}
  })
};




</script>

<template>
  <div class="ShowLists">
    <div class="ShowList" v-for="(ShowList, index) in showLists" :key="index" @click="goToDetail(ShowList)">
      <!--假设 ID 为 index，也可以根据需要更改-->
      <div class="ShowList-content">
        <img :src="ShowList.pic" class="ShowList-pic" />
        <div class="ShowList-details">
          <h2 class="ShowList-name">{{ ShowList.name }}</h2>
          <p class="ShowList-message">{{ ShowList.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ShowLists {
  max-width: 95%;
  margin: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
  /* 每个景点间的间距 */
}

.ShowList {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.ShowList:hover {
  transform: scale(1.02);
  /* 鼠标悬停效果 */
}

.ShowList-content {
  display: flex;
  /* 使用 flexbox 排列图片和内容 */
  align-items: center;
  /* 垂直居中对齐 */
}

.ShowList-name {
  font-size: 1.5em;
  /* 大标题 */
  margin-top: 0;
  /* 清除默认 margin */
}

.ShowList-pic {
  width: 250px;
  /* 设置图片宽度 */
  height: 156px;
  /* 设置高度 */
  border-radius: 8px;
  margin-right: 5%;
  /* 图片与描述之间的间距 */
}

.ShowList-details {
  text-align: left;
  /* 左对齐描述 */
  width: 80%;
}

.ShowList-message {
  font-size: 1em;
  color: #555;
  /*次要文字颜色 */
  overflow: hidden;
  /* 隐藏超出内容 */
  text-overflow: ellipsis;
  /* 超出部分用省略号表示 */
  display: block;
  /* 使文本块行为正常 */
  white-space: nowrap;
}
</style>