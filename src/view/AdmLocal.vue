<template>
    <div class="container">
        <h1>土特产列表</h1>
        <div class="scrollbarBox" id="scenery-list">
            <el-scrollbar>
                <div class="scenery-item">
                    <div class="image-placeholder">
                        <span class="number-label">1</span>
                    </div>
                    <div class="scenery-description">
                        <div class="descriptionBox">
                            <h2>特产 1</h2>
                            <p>这是第一个特产的描述，介绍该特产的特点和历史。</p>
                            <p></p>
                        </div>
                        <div class="saleBox">
                            <p>价格：</p>
                            <p>库存：</p>
                        </div>

                    </div>
                    <div class="button-group">
                        <button class="modify-button" @click="centerDialogVisible = true">修改</button>
                        <button class="delete-button">删除</button>
                    </div>
                </div>

                <div class="scenery-item">
                    <div class="image-placeholder">
                        <span class="number-label">2</span>
                    </div>
                    <div class="scenery-description">
                        <div class="descriptionBox">
                            <h2>特产 2</h2>
                            <p>这是第2个特产的描述，介绍该特产的特点和历史。</p>
                            <p></p>
                        </div>
                        <div class="saleBox">
                            <p>价格：</p>
                            <p>库存：</p>
                        </div>

                    </div>
                    <div class="button-group">
                        <button class="modify-button" @click="centerDialogVisible = true">修改</button>
                        <button class="delete-button">删除</button>
                    </div>
                </div>

                <div class="scenery-item">
                    <div class="image-placeholder">
                        <span class="number-label">3</span>
                    </div>
                    <div class="scenery-description">
                        <div class="descriptionBox">
                            <h2>特产 3</h2>
                            <p>这是第3个特产的描述，介绍该特产的特点和历史。</p>
                            <p></p>
                        </div>
                        <div class="saleBox">
                            <p>价格：</p>
                            <p>库存：</p>
                        </div>

                    </div>
                    <div class="button-group">
                        <button class="modify-button" @click="centerDialogVisible = true">修改</button>
                        <button class="delete-button">删除</button>
                    </div>
                </div>

                <button class="addButton" @click="centerDialogVisible = true">增加</button>
            </el-scrollbar>

        </div>
    </div>

    <el-dialog v-model="centerDialogVisible" title="特产修改" width="50rem" align-center>
        <el-form label-position="left" v-model="form" class="fromBox">
            <div class="nameBox formItem">
                <el-form-item label="特产名称" class="formItemBox">
                    <el-input v-model="form.name" style="height: 60%;width: 100%;" />
                </el-form-item>
            </div>

            <div class="descriptionBox formItem">
                <el-form-item label="特产介绍" class="formItemBox">
                    <el-input type="textarea" :rows="10" v-model="form.description" style="height: 85%;width: 100%;" />
                </el-form-item>
            </div>

            <div class="imgBox formItem">
                <el-form-item label="特产图像" class="formItemBox">
                    <el-upload ref="uploadRef" class="upload"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :auto-upload="false">
                        <template #trigger>
                            <el-button type="primary">select file</el-button>
                        </template>

                        <el-button class="ml-3" type="success" @click="submitUpload">
                            upload to server
                        </el-button>

                    </el-upload>
                </el-form-item>
            </div>

            <div class="priceBox formItem">
                <el-form-item label="特产价格" class="formItemBox">
                    <el-input v-model.number="form.price" />
                </el-form-item>
            </div>

            <div class="stockBox formItem">
                <el-form-item label="特产库存" class="formItemBox">
                    <el-input v-model.number="form.stock" />
                </el-form-item>
            </div>


        </el-form>

        <template #footer>
            <div class="dialog-footer footer">
                <el-button class="cancelbutton" type="primary" @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue'
import type { UploadInstance } from 'element-plus'

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
    uploadRef.value!.submit()
}

const form = ref({
    name: '',
    description: '',
    price: 0,
    stock: 0,
})
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
    display: flex;
    flex-direction: row;
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

.descriptionBox {
    height: 40%;
    width: 100%;
}

.saleBox {
    height: 100%;
    width: 30%;
    padding-top: 1%;
    padding-bottom: 1%;
    padding-left: 6%;
    padding-right: 6%;
    box-sizing: border-box;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.nameBox {
    width: 100%;
    height: 10%;
}

.imgBox {
    width: 100%;
    height: 13%;
}

.upload {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}

.priceBox {
    height: 10%;
    width: 100%;
}

.stockBox {
    width: 100%;
    height: 10%;
}

::v-deep .el-form-item__label {
    font-size: 1.1rem;
}
</style>