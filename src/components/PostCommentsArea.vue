<template>
<div class="comments-section">  
    <h2>评论区</h2>  
    <div v-for="comment in comments" :key="comment.id" class="comment">  
      <img :src="comment.avatar" alt="用户头像" class="avatar" />  
      <div class="comment-info">  
        <strong>{{ comment.username }}</strong>  
        <p>{{ comment.text }}</p>  
        <button @click="likeComment(comment.id)">点赞 ({{ comment.likes }})</button>  
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
import { Axios } from 'axios'; 

let comments = ref([]);

/**
 * 获取评论列表
 * 
 * 请求参数：
 * user_id:String,
 * post_id:String,
 * 
 * 响应参数：
 * comments:[{
 *    post_comment_id,
 *    username,
 *    content,
 *    likes,
 *    avatar,
 * },...],
 * userComments:[]  (用户在这个帖子评论区里发表的所有评论的id)
 * 
 */
const fetchComments = async () => {  
  try{
    const url = 'http://localhost:8081/comments';
    const response = await Axios.post(url,{},
    {
      headers:{
        'Content-Type': 'application/json',
      }
    }
  );

  console.log("响应评论",response.data);
  let userComments = response.data.userComments;
  let comments = response.data.comments;
  for(let i=0;i<response.data.length;i++){
    const item={
      id: response.data[i].post_comment_id,
      username: response.data[i].username,
      text: response.data[i].content,
      likes: response.data[i].likes,
      isOwner: false, 
    }

    if(userComments.includes(item.id)){
      item.isOwner = true;
    }

    comments.value.push(item);
  }
  } catch (error) {
    console.log("出错",error);
    alert("加载失败，请稍后再试。");
  }
}

//fetchComments();

let newComment = ref("");  

/**  
 * 点赞评论  
 *   
 * 请求参数:  
 * commentId: String
 */  
let likeComment = async (id) => {  
  try {  
    const url = "http://localhost:8081/comments/likes";  
    const response = await Axios.post(url, {}, {  
      headers: {  
        'Content-Type': 'application/json',  
      }  
    });  
    console.log("点赞成功");  
    const comment = comments.value.find(c => c.id === id);  
    if (comment) {  
      comment.likes += 1;  
    }  
  } catch (error) {  
    console.error("点赞失败:", error);  
    alert("点赞失败，请稍后再试。");  
  }  
};  

//likeComment();

/**  
 * 编辑评论  
 *   
 * 请求参数:  
 * post_comment_id: String  
 * content: String  
 *   
 * 响应参数:  
 * 无需返回具体数据，评论内容在前端直接更新  
 */  

let editComment = async (commentId) => {  
  try {  
    const comment = comments.value.find(c => c.id === commentId);  
    if (!comment) {  
      console.error("评论未找到");  
      return;  
    }  

    const url = `http://localhost:8081/comments/${commentId}`;  
    const response = await Axios.put(url, {  
      content: comment.text  
    }, {  
      headers: {  
        'Content-Type': 'application/json',  
      }  
    });  

    console.log("编辑成功");  
  } catch (error) {  
    console.error("编辑失败:", error);  
    alert("编辑失败，请稍后再试。");  
  }  
};  

//eidtComment();

/**  
 * 删除评论  
 *   
 * 请求参数:  
 * post_comment_id: String  
 *   
 * 响应参数:  
 * 无需返回具体数据，评论将从评论列表中移除  
 */  
 let deleteComment = async (commentId) => {  
  try {  
    const url = `http://localhost:8081/comments/${commentId}`;  
    const response = await Axios.delete(url, {  
      headers: {  
        'Content-Type': 'application/json',  
      }  
    });  
    console.log("删除成功");  
    comments.value = comments.value.filter(c => c.id !== commentId);  
  } catch (error) {  
    console.error("删除失败:", error);  
    alert("删除失败，请稍后再试。");  
  }  
};   

//deleteComment();

/**  
 * 提交新评论  
 *   
 * 请求参数:  
 * content: String  
 *   
 * 响应参数:  
 * id: 新评论的ID  
 * username: 评论作者的用户名  
 * avatar: 评论作者的头像  
 * likes: 评论的点赞数  
 * contect: 评论的内容  
 */  
 let submitComment = async () => {  
  try {  
    if (newComment.value.trim() === "") {  
      alert("请先输入评论内容");  
      return;  
    }  

    const url = 'http://localhost:8081/comments';  
    const response = await Axios.post(url, {  
      content: newComment.value  
    }, {  
      headers: {  
        'Content-Type': 'application/json',  
      }  
    });  

    console.log("提交成功");  
    comments.value.push({  
      id: response.data.id,  
      username: currentUser.username,  
      avatar: currentUser.avatar,  
      text: newComment.value,  
      likes: 0,  
      isOwner: true,  
    });  
    newComment.value = "";  
  } catch (error) {  
    console.error("提交失败:", error);  
    alert("提交失败，请稍后再试。");  
  }  
};  

//submitComment();
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