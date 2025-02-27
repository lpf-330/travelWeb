<template>  
    <div class="post-detail">  
      <h1 class="post-title">{{ post.title }}</h1>  
      <div class="date-info">  
        <span><strong>创建时间:</strong> {{ createdAt }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  
        <span><strong>更新时间:</strong> {{ updatedAt }}</span>  
      </div>  
  
      <div class="category-info">  
        <strong>分区:</strong> {{ post.category }}  
      </div>  
  
      <div class="content">  
        <h2>帖子内容</h2>  
        <p>{{ post.content }}</p>  
      </div>  
  
      <div class="likes">  
        <LikeButton></LikeButton>  
      </div>
      <PostCommentsArea></PostCommentsArea>  
    </div>  
  </template>  
  
  <script setup>  
  import { ref } from 'vue';  
  import Main from '../components/Main.vue';  
  import LikeButton from '../components/LikeButton.vue';
  import PostCommentsArea from '../components/PostCommentsArea.vue'; 
  
  // 假设我们有一个帖子数据对象  
  let post = ref({  
    title: "探索Vue 3的世界",  
    content: "Vue 3是一个渐进式的JavaScript框架，用于构建用户界面。它具有更好的性能和更小的体积，并引入了组合式API，使得代码组织和复用变得更加简单。",  
    category: "前端开发"  
  });  
  
  // 创建时间和更新时间  
  let createdAt = ref("2024-01-01");  
  let updatedAt = ref("2024-12-01");  
  </script>  
  
  <style scoped>  
  .post-detail {  
    max-width: 95%;  
    margin: auto;  
    padding: 20px;  
    border: 1px solid #ccc;  
    border-radius: 8px;  
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  
  }  
  
  .post-title {  
    text-align: center;  
  }  
  
  .date-info {  
    margin-bottom: 20px;  
    font-size: 0.9em;  
    color: #555;  
    text-align: center;  
  }  
  
  .category-info {  
    margin-bottom: 20px;  
    font-size: 1em;  
    color: #333;  
    text-align: center;  
  }  
  
  .content {  
    margin-bottom: 20px;  
    text-align: center;  
    padding-left: 50px;  
    padding-right: 50px;  
  }  
  
  h2 {  
    font-size: 1.5em;  
    margin-bottom: 10px;  
  }  
  
  .likes {  
    text-align: center;  
  }  
  </style>