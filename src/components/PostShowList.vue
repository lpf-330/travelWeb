<template>  
    <div class="ShowLists">  
      <div  
        class="ShowList"  
        v-for="(ShowList, index) in showLists"  
        :key="ShowList.id"  
        @click="toPost(ShowList.id)"
      >  
          <div class="ShowList-details">  
            <h2 class="ShowList-name">{{ ShowList.name }}</h2>  
            <p class="ShowList-message">{{ ShowList.message }}</p>  
          </div>  
          <div class="ShowList-actions">  
            <button v-if="ShowList.authorId === currentUser.id" @click="$emit('editPost', ShowList)">编辑</button>  
            <button v-if="ShowList.authorId === currentUser.id" @click="$emit('deletePost', ShowList.id)">删除</button>  
          </div>  
      </div>  
    </div>  
  </template>  
  
  <script setup>  
  import { id } from 'element-plus/es/locales.mjs';
  import { defineProps } from 'vue';  
  import { useRouter } from 'vue-router';  
  const router = useRouter();
  
  // 接收父组件传来的 showLists 和 currentUser 属性  
  let props = defineProps({  
    showLists: {  
      type: Array,  
      required: true, // 这是一个必需的属性  
    },  
    currentUser: {  
      type: Object,  
      required: true, // 这是一个必需的属性  
    }  
  });  

  const toPost = (id) => {

    console.log('123',id);
    
  router.push({
    name: 'post',
    state:{
      id: id
    }
  })
}
  
  </script>  
  
  <style scoped>  
  .ShowLists 
  {
    width: 95%;  
    margin: auto;  
    text-align: center;  
    display: flex;  
    flex-direction: column;  
    gap: 1rem; /* 每个帖子间的间距 */  
  }  

  .ShowList {
    width: 100%;  
    border: 1px solid #ccc;  
    border-radius: 8px;  
    padding: 1.5rem;  
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  
    transition: transform 0.4s;
    cursor: pointer;  
  }  
  
  .ShowList:hover {  
    transform: scale(1.02); /* 鼠标悬停效果 */  
  }  
  
  .ShowList-content {  
    display: flex; /* 使用 flexbox 排列内容 */  
    justify-content: space-between; /* 内容两端对齐 */  
    align-items: center; /* 垂直居中对齐 */  
  }  
  
  .ShowList-name {
    font-size: 1.5em; /* 帖子标题字体大小 */  
    color: #333; /* 帖子标题颜色 */  
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
  
  .ShowList-actions button {  
    margin-left: 10px; /* 按钮间距 */  
    padding: 8px 12px;  
    border: none;  
    border-radius: 4px;  
    background-color: #007bff; /* 按钮背景颜色 */  
    color: white;  
    cursor: pointer;  
    transition: background-color 0.3s;  
  }  
  
  .ShowList-actions button:hover {  
    background-color: #0056b3; /* 悬停按钮效果 */  
  }  
  
  </style>