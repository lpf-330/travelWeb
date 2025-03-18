<template>  
    <div class="post-detail">  
      <h1 class="post-title">{{ post.title }}</h1>  
      <div class="date-info">  
        <span><strong>创建时间:</strong> {{ post.created_at }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  
      </div>  

  
      <div class="content">  
        <h2>帖子内容</h2>  
        <p>{{ post.message }}</p>  
      </div>  
  
      <div class="likes">  
        <LikeButton></LikeButton>  
      </div>
      <PostCommentsArea></PostCommentsArea>  
    </div>  
  </template>  
  
  <script setup>  
  import { ref,onMounted } from 'vue';  
  import Main from '../components/Main.vue';  
  import LikeButton from '../components/LikeButton.vue';
  import PostCommentsArea from '../components/PostCommentsArea.vue'; 
  import axios from 'axios';
  import usePostStore from '../stores/post';
  import { storeToRefs } from 'pinia';
  

let postStore=storeToRefs(usePostStore())

console.log(postStore.postId.value);

let post=ref({});


const fetchPosts=async()=>{

  try {
    
   const post_id = postStore.postId.value; // 获取帖子 ID  
    const url = `http://localhost:8081/post/${post_id}`; // 拼接 URL  
    const response = await axios.get(url);  
  
     post.value = response.data.data;
     console.log('响应', post.value); 


  } catch (error) {
     console.error("出错", error);  
    alert("加载失败，请稍后再试。"); // 友好的错误提示  
    
  }


}

 onMounted(fetchPosts)



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
