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
  import LikeButton from '../components/LikeButton.vue';
  import PostCommentsArea from '../components/CommentsArea.vue';
  import axios from 'axios'; 

  console.log('postDetails',history.state);
  
  
  const fetchPostsDetails = async () => {
  try {
    const url = "http://localhost:8081/post/post_id"
    const response = await axios.post(url, {post_id: history.state.post_id
    },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log("响应帖子详情", response.data);

    post.value={
      title: response.data.title,
      content: response.data.message,
      category: response.data.post_partition,
    }

    createdAt.value = response.data.created_at;
    updatedAt.value = response.data.updated_at;

  } catch (error) {
    console.error("出错", error);
    alert("加载失败，请稍后再试。");

  }
}

  // fetchPostsDetails();
  
  let post = ref({});  
  let createdAt = ref();  
  let updatedAt = ref();  
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