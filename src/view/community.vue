<template>
  <div>
    <div class="post-list">
      <ShowLists :showLists="posts" @editPost="openEditModal" @deletePost="deletePost" :currentUser="currentUser" />
      <br>
      <div class="add-post" @click="showAddModal = true">+</div>
    </div>

    <!-- 添加帖子模态框 -->
    <Modal v-if="showAddModal" title="添加新帖子" :onSubmit="submitPost" @close="showAddModal = false">
      <input v-model="newPost.title" placeholder="请输入帖子标题" />
      <textarea v-model="newPost.content" placeholder="请输入帖子内容"></textarea>
    </Modal>

    <!-- 修改帖子模态框 -->
    <Modal v-if="showEditModal" title="修改帖子" :onSubmit="updatePost" @close="showEditModal = false">
      <input v-model="editPost.title" placeholder="请输入帖子标题" />
      <textarea v-model="editPost.content" placeholder="请输入帖子内容"></textarea>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ShowLists from '../components/PostShowList.vue';
import Modal from '../components/PostModal.vue'; // 引入模态框组件  
import router from '../router';
import axios from 'axios';
import useUserInfoStore from '../stores/user';
import { storeToRefs } from 'pinia';

const userInfoStore = storeToRefs(useUserInfoStore())



// 模拟当前用户  
let currentUser = ref({
  id: userInfoStore.user_id.value, // 假设当前用户ID  
  name: userInfoStore.username.value // 当前用户名称  
});

const posts = ref([]); //社区帖子数据


const fetchPosts = async () => {
  try {

    const url = "http://localhost:8081/post/getPosts"
    const response = await axios.post(url, {
    },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log("响应帖子", response.data);
    for (let i = 0; i < response.data.length; i++) {
      posts.value.push({
        id:response.data[i].post_id,
        name:response.data[i].title,
        message:response.data[i].message,
        authorId:response.data[i].user_id,
      }) 
    }

  } catch (error) {
    console.error("出错", error);
    alert("加载失败，请稍后再试。");
  }
}

fetchPosts();

let showAddModal = ref(false);
let showEditModal = ref(false);
let newPost = ref({
  title: '',
  content: '',
});
let editPost = ref({
  id: null, // 用于存储编辑的帖子的ID  
  title: '',
  content: '',
});

/**
 * 创建新帖子
 * 
 * 请求参数：
 * {
 *   title: String,    // 标题（必需）
 *   message: String   // 内容（必需）
 *   user_id: Number,     // 作者ID
 * }
 * 
 * 响应参数：
 * {
 *   post_id: Number,     // 帖子ID
 *   title: String,       // 标题
 *   message: String,     // 内容

 * }
 * 
 */
const submitPost = async () => {
  if (!newPost.value.title || !newPost.value.content) {
    alert('标题和内容不能为空');
    return;
  }

  try {
    const response = await axios.post(`${API_BASE}/createPost`, {
      title: newPost.value.title,
      message: newPost.value.content,
      user_id: currentUser.value.id
    });

    posts.value.unshift({ // 将新帖子添加到列表顶部
      id: response.data.post_id,
      name: response.data.title,
      message: response.data.message,
      authorId: currentUser.value.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    newPost.value = { title: '', content: '' };
    showAddModal.value = false;
  } catch (error) {
    console.error("创建帖子失败:", error);
    alert("提交失败，请稍后再试。");
  }
};

// 打开编辑模态框  
let openEditModal = (post) => {
  if (post.authorId !== currentUser.value.id) {
    console.log('您没有权限修改此帖子。');
    return; // 如果不是作者，返回  
  }
  editPost.value = { ...post }; // 复制要编辑的帖子数据  
  showEditModal.value = true; // 显示编辑模态框  
};

/**
 * 更新帖子
 * 
 * 请求参数：
 * {
 *   post_id: Number,  // 要更新的帖子ID
 *   title: String,    // 标题（必需）
 *   message: String   // 内容（必需）
 * }
 * 
 * 响应参数：
 * 是否更新成功，无响应参数
 */
const updatePost = async () => {
  try {
    await axios.post(`${API_BASE}/updatePost/${editPost.value.id}`, {
      title: editPost.value.title,
      message: editPost.value.content
    });

    const index = posts.value.findIndex(p => p.id === editPost.value.id);
    if (index !== -1) {
      posts.value[index] = {
        ...posts.value[index],
        name: editPost.value.title,
        message: editPost.value.content,
        updatedAt: new Date().toISOString()
      };
    }
    showEditModal.value = false;
  } catch (error) {
    console.error("更新帖子失败:", error);
    alert("更新失败，请稍后再试。");
  }
};

/**
 * 删除帖子
 * 
 * 请求参数：
 * {
 *   post_id: Number  // 要删除的帖子ID
 * }
 *  
 * 响应参数：
 * {
 *   message: String  // 删除成功提示信息
 * }
 *
 */
const deletePost = async (postId) => {
  if (!confirm('确定要删除这个帖子吗？')) return;

  try {
    await axios.delete(`${API_BASE}/deletePost/${postId}`);
    posts.value = posts.value.filter(post => post.id !== postId);
  } catch (error) {
    console.error("删除帖子失败:", error);
    alert("删除失败，请稍后再试。");
  }
};

</script>

<style scoped>
.post-list {
  padding: 2%;
  max-width: 90%;
  margin: auto;
  text-align: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.add-post {
  font-size: 2em;
  color: white;
  background-color: #28a745;
  padding: 10px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

.add-post:hover {
  background-color: #218838;
}

textarea {
  height: 300px;
}
</style>