<template>
<div class="like-button" @click="handleClick"> 
    <span>&#x1F44D; 点赞 {{ likes }}</span>  
</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 接收父组件传递的点赞数
const props = defineProps({
  likes: {
    type: Number,
    required: true,
    default: 0
  }
});

// 定义事件发射器
const emit = defineEmits(['like']);

// 点击时触发父组件事件
const handleClick = () => {
  emit('like');
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