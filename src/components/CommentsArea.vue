<template>
<div class="comments-section">  
    <h2>评论区</h2>  
    <div v-for="comment in comments" :key="comment.id" class="comment">  
      <img :src="comment.avatar" alt="用户头像" class="avatar" />  
      <div class="comment-info">  
        <strong>{{ comment.username }}</strong>  
        <p>{{ comment.text }}</p>  
        <button @click="likeComment(comment.id)">点赞 ({{ comment.likes }})</button>  
        <!-- 仅当评论是当前用户的时显示编辑和删除按钮 -->  
        <template v-if="comment.isOwner">  
          <button @click="editComment(comment.id)">编辑</button>  
          <button @click="deleteComment(comment.id)">删除</button>  
        </template>  
      </div>  
    </div>  
    <div class="add-comment">  
      <textarea v-model="newComment" placeholder="发表你的评论..."></textarea>  
      <button @click="submitComment">提交</button>  
    </div>  
    </div>
</template>

<script setup>
import { ref } from 'vue'; 

// 评论数据结构，添加 isOwner 属性  
let comments = ref([  
  {  
    id: 1,  
    username: "用户1",  
    avatar: "https://via.placeholder.com/200",  
    text: "非常美的地方！",  
    likes: 0,  
    isOwner: false, // 不是当前用户的评论  
  },  
  {  
    id: 2,  
    username: "我", // 当前用户的评论  
    avatar: "https://via.placeholder.com/200",  
    text: "值得一去！",  
    likes: 0,  
    isOwner: true, // 当前用户的评论  
  },  
]);  

let newComment = ref("");  

// 点赞某个评论  
let likeComment = (id) => {  
  const comment = comments.value.find(c => c.id === id);  
  if (comment) {  
    comment.likes += 1;  
  }  
};  

// 编辑某个评论  
let editComment = (id) => {  
  const comment = comments.value.find(c => c.id === id);  
  if (comment) {  
    newComment.value = comment.text; // 填充评论框  
    deleteComment(id); // 删除原评论以修改  
  }  
};  

// 删除评论  
let deleteComment = (id) => {  
  comments.value = comments.value.filter(c => c.id !== id);  
};  

// 提交新评论  
let submitComment = () => {  
  if (newComment.value.trim() !== "") {  
    comments.value.push({  
      id: comments.value.length + 1,  
      username: "我",  
      avatar: "https://example.com/myavatar.jpg",  
      text: newComment.value,  
      likes: 0,  
      isOwner: true, // 新评论的作者是当前用户  
    });  
    newComment.value = ""; // 清空输入框  
  }  
};  
</script>

<style scoped>
.comments-section {  
    max-width: 100%; /* 限制评论区宽度 */  
    margin: 20px auto; /* 居中对齐 */  
    padding: 15px; /* 内边距 */  
    border: 1px solid #ccc; /* 边框 */  
    border-radius: 8px; /* 圆角 */  
    background-color: #f9f9f9; /* 背景颜色 */  
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 阴影效果 */  
}  

.comments-section h2 {  
    text-align: center; /* 标题居中 */  
    color: #333; /* 标题颜色 */  
    margin-bottom: 15px; /* 标题下边距 */  
}  

.comment {  
    display: flex; /* 灵活布局 */  
    align-items: flex-start; /* 垂直对齐 */  
    padding: 10px; /* 内边距 */  
    border-bottom: 1px solid #e0e0e0; /* 下边框 */  
}  

.comment:last-child {  
    border-bottom: none; /* 最后一条评论移除下边框 */  
}  

.avatar {  
    width: 50px; /* 头像宽度 */  
    height: 50px; /* 头像高度 */  
    border-radius: 50%; /* 圆形头像 */  
    margin-right: 10px; /* 头像和评论内容之间的间距 */  
}  

.comment-info {  
    flex: 1; /* 填满剩余空间 */  
}  

.comment-info strong {  
    display: block; /* 强调用户名称为块 */  
    color: #007BFF; /* 用户名颜色 */  
}  

.comment-info p {  
    margin: 5px 0; /* 评论文字的垂直间距 */  
    color: #555; /* 评论文字颜色 */  
}  

button {  
    margin-right: 5px; /* 按钮之间的间距 */  
    padding: 5px 10px; /* 按钮内边距 */  
    border: none; /* 移除边框 */  
    border-radius: 4px; /* 圆角 */  
    background-color: #007BFF; /* 按钮背景颜色 */  
    color: white; /* 按钮文字颜色 */  
    cursor: pointer; /* 鼠标指针样式 */  
    transition: background-color 0.3s; /* 动效效果 */  
}  

button:hover {  
    background-color: #0056b3; /* 悬停时背景颜色 */  
}  

.add-comment {  
    margin-top: 20px; /* 上边距 */  
    display: flex; /* 水平布局 */  
    flex-direction: column; /* 纵向排列 */  
}  

textarea {  
    width: 98%; /* 占满宽度 */  
    height: 80px; /* 高度 */  
    border: 1px solid #ccc; /* 边框 */  
    border-radius: 4px; /* 圆角 */  
    padding: 10px; /* 内边距 */  
    font-size: 14px; /* 字体大小 */  
    margin-bottom: 10px; /* 下边距 */  
    resize: none; /* 禁止调整大小 */  
}  

textarea:focus {  
    border-color: #007BFF; /* 聚焦时边框颜色 */  
    outline: none; /* 移除默认轮廓 */  
}
</style>