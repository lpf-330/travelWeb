<template>
<div class="like-button" @click="incrementLikes">  
    <span v-if="isLiked">&#x1F44D;  已赞 {{ likes }} 次</span>  
    <span v-else>&#x1F44D; 点赞 {{ likes }}</span>  
</div>
</template>

<script setup>
import { ref } from 'vue';
// 定义响应式状态  
let likes = ref(0); // 点赞次数  
let isLiked = ref(false); // 是否已点赞  

// 点赞函数  
let incrementLikes = () => {  
  // 如果未点赞，则增加点赞数  
  if (!isLiked.value) {  
    likes.value += 1;  
    isLiked.value = true; // 设置为已点赞状态  
  } else {  
    alert("你已经点赞过了！"); // 用户反馈  
  }  
};  
</script>

<style scoped>
.like-button {  
  display: inline-flex; /* 使按钮在行内排列 */  
  align-items: center; /* 垂直居中对齐 */  
  padding: 10px 15px; /* 内边距 */  
  background-color: #007bff; /* 按钮的背景颜色 */  
  color: white; /* 按钮文字颜色 */  
  border: none; /* 移除边框 */  
  border-radius: 5px; /* 圆角 */  
  cursor: pointer; /* 鼠标悬停时为手型 */  
  transition: background-color 0.3s, transform 0.2s; /* 动效效果 */  
  font-size: 16px; /* 字体大小 */
}  

.like-button:hover {  
  background-color: #0056b3; /* 悬停时更改背景颜色 */  
}  

.like-button:active {  
  transform: scale(0.95); /* 按下时缩放 */  
}
</style>