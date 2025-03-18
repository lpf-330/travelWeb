<template>
<div class="container">
        <div class="total">
            <AdmMain></AdmMain>
        </div>
        <h1>帖子列表</h1>
        <div class="review-section">
            <div class="review-item">
                <div class="user-id">用户ID: <span>用户A</span></div>
                <div class="review-content">景色真美可可！</div>
                <div class="review-actions">
                    <button class="ban" onclick="openBanModal('用户A')">封禁</button>
                    <button class="pass" onclick="handlePass('用户A')">通过</button>
                    <button class="reject" onclick="handleReject('用户A')">拒绝</button>
                </div>
            </div>
            <div class="review-item">
                <div class="user-id">用户ID: <span>用户B</span></div>
                <div class="review-content">非常不好！</div>
                <div class="review-actions">
                    <button class="ban" onclick="openBanModal('用户B')">封禁</button>
                    <button class="pass" onclick="handlePass('用户B')">通过</button>
                    <button class="reject" onclick="handleReject('用户B')">拒绝</button>
                </div>
            </div>
        </div>
    </div>

    <!-- 封禁弹出窗口 -->
    <div id="banModal" class="modal">
        <div class="modal-content">
            <span class="close" onclick="closeBanModal()">&times;</span>
            <h2>封禁用户</h2>
            <form id="banForm">
                <div>
                    <label for="banUserId">用户ID:</label>
                    <input type="text" id="banUserId" readonly>
                </div>
                <div>
                    <label for="banReason">封禁理由:</label>
                    <textarea id="banReason" required></textarea>
                </div>
                <button type="submit">提交封禁</button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import AdmMain from '../components/AdmMain.vue';

onMounted(()=>{
    // 打开封禁模态窗口  
function openBanModal(userId) {
    document.getElementById('banUserId').value = userId;
    document.getElementById('banModal').style.display = 'block';
}

// 关闭封禁模态窗口  
function closeBanModal() {
    document.getElementById('banModal').style.display = 'none';
}

// 点击模态窗口之外区域关闭模态窗口  
window.onclick = function (event) {
    if (event.target == document.getElementById('banModal')) {
        closeBanModal();
    }
}

// 处理封禁提交  
document.getElementById('banForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const banUserId = document.getElementById('banUserId').value;
    const banReason = document.getElementById('banReason').value;

    alert(`用户 ${banUserId} 被封禁，理由：${banReason}`);

    // 关闭模态窗口  
    closeBanModal();
});

// 处理通过操作  
function handlePass(userId) {
    alert(`用户 ${userId} 的评价已通过。`);
}

// 处理拒绝操作  
function handleReject(userId) {
    alert(`用户 ${userId} 的评价已被拒绝。`);
}
});
</script>


<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #e9ecef;
    /* 页面背景颜色 */
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 100%;
    margin: auto;
    background: white;
    /* 容器背景色 */
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
}

h1 {
    color: #333;
}

.review-section {
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
    padding-bottom: 10px;
}

.review-item {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #f8f9fa;
    /* 评价项目的背景色 */
}

.review-content {
    margin: 5px 0;
}

.review-actions {
    display: flex;
    justify-content: flex-end;
    /* 将按钮靠右对齐 */
    margin-top: 10px;
}

.review-actions button {
    margin-left: 10px;
    /* 为按钮之间添加间距 */
}

button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.pass {
    background-color: #28a745;
    /* 通过按钮的背景色 */
    color: white;
}

.reject {
    background-color: #dc3545;
    /* 拒绝按钮的背景色 */
    color: white;
}

.ban {
    background-color: #ffc107;
    /* 封禁按钮的背景色（自定义） */
    color: white;
}

.modal {
    display: none;
    /* 默认隐藏 */
    position: fixed;
    z-index: 1000;
    /* 显示在最上层 */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    /* 背景蒙罩 */
}

.modal-content {
    background-color: white;
    /* 模态窗口背景 */
    margin: 15% auto;
    /* 居中 */
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    /* 宽度 */
}

.close {
    color: #aaa;
    /* 关闭按钮颜色 */
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    /* 鼠标悬停效果 */
    text-decoration: none;
    cursor: pointer;
}

.total {
    width: 100%;
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
</style>