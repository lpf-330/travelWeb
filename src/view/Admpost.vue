<template>
    <div class="container">
        <h1>帖子列表</h1>
        <div class="scrollbarBox" id="scenery-list">
            <el-scrollbar>
                <div class="scenery-item" v-for="(value, index) in posts" v-bind:key="value.post_id"
                    @click="centerDialogVisible = true; fatchPostDetails(value.post_id)">
                    <div class="image-placeholder">
                        <span class="number-label">{{ index }}</span>
                    </div>
                    <div class="scenery-description">
                        <h2>{{ value.title }}</h2>
                        <p>{{ value.message }}</p>
                    </div>
                    <div class="button-group">
                        <button class="delete-button" @click.stop @click="deletePost(value.post_id)">删除</button>
                    </div>
                </div>



            </el-scrollbar>

        </div>
    </div>

    <el-dialog v-model="centerDialogVisible" title="帖子修改" width="50rem" align-center>
        <el-form label-position="left" v-model="form" class="fromBox">
            <div class="nameBox formItem">
                <el-form-item label="帖子标题" class="formItemBox head">
                    <span>{{ postDetails.title }}</span>
                </el-form-item>
            </div>

            <div class="descriptionBox formItem">
                <el-form-item label="帖子内容" class="formItemBox">
                    <el-scrollbar height="95%">
                        <span>{{ postDetails.message }}
                        </span>
                    </el-scrollbar>
                </el-form-item>
            </div>

            <div class="imgBox formItem">
                <el-form-item label="帖子图像" class="formItemBox">
                    <div class="img"></div>
                </el-form-item>
            </div>

            <div class="commentBox formItem">
                <el-form-item label="帖子评论" class="formItemBox">
                    <el-scrollbar height="100%" style="width: 100%;">
                        <div class="commentItem">
                            <div class="commenter">
                                <span>123</span>
                            </div>
                            <div class="commentBody">
                                <span></span>
                            </div>
                            <div class="commentDelete">
                                <button class="delete-button">删除</button>
                            </div>
                        </div>

                    </el-scrollbar>
                </el-form-item>
            </div>


        </el-form>

        <!-- <template #footer>
            <div class="dialog-footer footer">
                <el-button class="cancelbutton" type="primary" @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">
                    确定
                </el-button>
            </div>
        </template> -->
    </el-dialog>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'

const posts = ref([])
const postDetails = ref({
    post_id: '',
    title: '',
    message: '',
    img: '',
    comments: []
})


const fatchPosts = async () => {
    posts.value = []

    try {
        const url = "http://localhost:8081/post/getPosts"    //后端还没写
        const response = await axios.post(url, {

        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        for (let i = 0; i < response.data.length; i++) {
            posts.value.push(response.data[i])
        }

        console.log('posts', posts.value);



    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  
    }
}

fatchPosts()


const fatchPostDetails = async (post_id) => {

    try {
        const url = "http://localhost:8081/post/fetchPostsDetails"    //后端还没写
        const response = await axios.post(url, {
            post_id: post_id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        postDetails.value = {
            post_id: response.data.post_id,
            title: response.data.title,
            message: response.data.message,
            img: '',
            comments: []
        }

        fetchComments(post_id)

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  
    }
}


/**
 * 删除帖子
 * 
 * 请求参数：
 * post_id：Int
 * 
 * 响应参数：
 * 是否删除成功
 */
const deletePost = async (post_id) => {

    try {
        const url = "http://localhost:8081/post/deletePost"    //后端还没写
        const response = await axios.post(url, {
            post_id: post_id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        alert(response.data)
        if (response.data === "删除成功") {
            fatchPosts()
        }

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  
    }
}

const fetchComments = async (post_id) => {
    try {
        const url = "http://localhost:8081/post/fetchComments"    //后端还没写
        const response = await axios.post(url, {
            post_id: post_id,
            user_id: 1
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('fetchComments', response.data);



    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  
    }
}


/**
 * 删除帖子中的某个评论
 * 
 * 请求参数：
 * post_comment_id:String
 * 
 * 响应参数：
 * 是否删除成功
 * 
 */
const deleteComment = async (post_id) => {

    try {
        const url = "http://localhost:8081/post/deleteComment"    //后端还没写
        const response = await axios.post(url, {
            post_id: post_id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  
    }
}


const centerDialogVisible = ref(false)




</script>


<style scoped>
.container {
    height: 93.6%;
    margin: auto;
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 5%;
    padding-right: 5%;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
}

.scenery-item {
    display: flex;
    margin-bottom: 1.5rem;
    border: 0.1rem solid #ddd;
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-left: 3rem;
    padding-right: 3rem;
    border-radius: 1rem;
    background-color: #fafafa;
    position: relative;
    /* 让子元素相对于此盒子定位 */
    cursor: pointer;
}

.scrollbarBox {
    height: 90%;
}

.image-placeholder {
    width: 10rem;
    height: 10rem;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5rem;
    position: relative;
    /* 让数字标记相对于此盒子定位 */
}

.number-label {
    font-size: 3em;
    /* 数字标的字体大小 */
    color: white;
    /* 数字标的颜色 */
    position: absolute;
    /* 绝对定位 */
    top: 15%;
    /* 调整数字的位置 */
    left: 15%;
    /* 调整数字的位置 */
    transition: transform 0.3s;
    /* 平滑过渡效果 */
    opacity: 0.8;
    /* 数字的透明度 */
}

.scenery-item:hover .number-label {
    transform: scale(1.2);
    /* 悬浮时放大效果 */
}

.scenery-description {
    flex: 1;
}

.button-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

button {
    margin-top: 5px;
    margin-left: 5px;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
}

.modify-button {
    background-color: #007bff;
}

.modify-button:hover {
    background-color: #0056b3;
}

.delete-button {
    background-color: #dc3545;
}

.delete-button:hover {
    background-color: #c82333;
}

.addButton {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.addButton:hover {
    background-color: #218838;
}


.title {
    background-color: white;
    height: 70px;
}

.logo {
    margin-left: 50px;
    height: 100%;
    display: inline-block;
}

.logo img {
    width: 100%;
    height: 90%;
}

.system_name {
    position: absolute;
    height: 70px;
    display: inline-block;
    margin-left: 10px;
    text-align: center;
    font-size: 20px;
}

.list {
    position: absolute;
    display: inline-block;
    margin-left: 250px;
    margin-top: 22px;
}

.list span {
    padding-right: 30px;
    color: black;
    font-size: 17px;
}

.list span:hover {
    opacity: 0.7;
    text-decoration: underline;
    color: #ff9d00;
}

a {
    color: inherit;
    text-decoration: none;
}

.user {
    position: absolute;
    display: inline-block;
    right: 200px;
    margin-top: 22px;
    color: #ff9d00;
}

.login:hover {
    opacity: 0.7;
    text-decoration: underline;
    font-weight: bolder;
}

.registration:hover {
    opacity: 0.7;
    text-decoration: underline;
    font-weight: bolder;
}

.index_tail {
    width: 100%;
    height: 70px;
    background-color: #3adcae;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-style: italic;
    color: white;
    margin-top: 20px;
    text-align: center;
    line-height: 70px;
    border-bottom: 4px solid rgb(85, 127, 204);
}

#id1 {
    width: auto;
    height: 200px;
    float: left;
}

.fromBox {
    width: 100%;
    height: 40rem;
    display: flex;
    flex-direction: column;
}

.formItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

.formItemBox {
    margin: 0;
    width: 100%;
    height: 100%;
}


.footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.cancelbutton {
    background-color: #ccc;
}

.nameBox {
    width: 100%;
    height: 10%;
}

.descriptionBox {
    width: 100%;
    height: 30%;
}

.imgBox {
    width: 100%;
    height: 20%;
}

.commentBox {
    min-height: 40%;
    width: 100%;
}

::v-deep .el-form-item__label {
    font-size: 1.1rem;
}

.commentItem {
    width: 99%;
    height: 5rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    border-style: solid;
    border-color: #919191;
    border-width: 0.12rem;
}

.commenter {
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-color: #e0e0e0;
    border-right-width: 0.2rem;
    border-left: 0;
    border-top: 0;
    border-bottom: 0;
}

.commentBody {
    height: 100%;
    width: 65%;
    display: flex;
    align-items: center;
}

.commentDelete {
    height: 100%;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.img {
    height: 7rem;
    width: 7rem;
    margin-left: 5%;
    background-color: #919191;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.head span {
    margin-left: 2%;
}

::v-deep .el-form-item__content {
    align-items: flex-start;
}
</style>