<template>
    <div class="container">
        <h1>名人列表</h1>
        <div class="scrollbarBox" id="scenery-list">
            <el-scrollbar>
                <div class="scenery-item" v-for="(famousPeople, index) in famousPeopleList" :key="person_id">
                    <div class="image-placeholder">
                        <span class="number-label">{{index+1}}</span>
                    </div>
                    <div class="scenery-description">
                        <h2>{{famousPeople.name}}</h2>
                        <p>{{famousPeople.message}}</p>
                    </div>
                    <div class="button-group">
                        <button class="modify-button" @click="centerDialogVisible = true;handleModifyFamousPeople(famousPeople.person_id)">修改</button>
                        <button class="delete-button" @click="deleteFamousPeople(famousPeople.person_id)">删除</button>
                    </div>
                </div>
                <button class="addButton" @click="centerDialogVisible = true;handleAddFamousPeople">增加</button>
            </el-scrollbar>
        </div>
    </div>

    <el-dialog v-model="centerDialogVisible" title="名人内容" width="50rem" align-center>
        <el-form label-position="left" v-model="form" class="fromBox">
            <div class="nameBox formItem">
                <el-form-item label="名人名称" class="formItemBox">
                    <el-input v-model="form.name" style="height: 60%;width: 100%;" />
                </el-form-item>
            </div>

            <div class="imgBox formItem">
                <el-form-item label="名人图像" class="formItemBox">
                    <el-upload ref="uploadRef" class="upload"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :auto-upload="false">
                        <template #trigger>
                            <el-button type="primary">选择文件</el-button>
                        </template>

                        <el-button class="ml-3" type="success" @click="submitUpload">
                            上传图片
                        </el-button>

                    </el-upload>
                </el-form-item>
            </div>

            <div class="descriptionBox formItem">
                <el-form-item label="名人事迹" class="formItemBox">
                    <el-input type="textarea" :rows="12" v-model="form.description" style="height: 85%;width: 100%;" />
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
    image: ''
})
const centerDialogVisible = ref(false)

const famousPeopleList = ref([])  

/**
 *获取名人列表
 *
 * 请求参数：无
 * 响应参数：
 * famousPeopleList:[{
 * person_id: number,
 * name: string,
 * message: string,
 * image: string
 * },...]
 *  
 */
const fetchFamousPeople = async () => {  
    try {  
        const url = "http://localhost:8081/api/famousPeople/getFamousPeople"  
        const response = await axios.post(url, {}, {  
            headers: {  
                'Content-Type': 'application/json',  
            }  
        });  

        console.log("响应名人列表", response.data);  
        famousPeopleList.value = response.data.map(item => ({  
            person_id: item.person_id,  
            name: item.name,  
            message: item.message,  
            image: item.image  
        }));  
    } catch (error) {  
        console.error("获取名人列表失败", error);  
        alert("获取名人列表失败，请稍后再试。");  
    }  
}  
//fetchFamousPeople();

/**
 * 添加名人信息
 * 请求参数：
 * name: string,
 * message: string,
 * image: string
 * 响应参数：
 * person_id: number
 * 
 */
const handleAddFamousPeople = async () => {  
    try {  
        const url = "http://localhost:8081/api/famousPeople/addFamousPeople"  

        const formData = {  
            name: form.value.name,  
            message: form.value.description,  
            image: form.value.image  
        };  

        const response = await axios.post(url, formData, {  
            headers: {  
                'Content-Type': 'application/json',  
            }  
        });  

        console.log("添加成功", response.data);  
        // 刷新名人列表  
        await fetchFamousPeople();  
        centerDialogVisible.value = false;  

        // 显示成功提示  
        ElMessage.success("名人添加成功！");  
    } catch (error) {  
        console.error("添加失败", error);  
        alert("添加失败，请稍后再试。");  
    }  
}  


/**
 * 修改名人信息
 *
 * 请求参数：
 * id: number,
 * name: string,
 * message: string,
 * image: string
 * 响应参数：
 * 无
 */
const handleModifyFamousPeople = async (id) => {  
    try {  
        const url = "http://localhost:8081/api/famousPeople/modifyFamousPeople"  

        const formData = {  
            id: id,  
            name: form.value.name,  
            message: form.value.description,  
            image: form.value.image  
        };  

        const response = await axios.post(url, formData, {  
            headers: {  
                'Content-Type': 'application/json',  
            }  
        });  

        console.log("修改成功", response.data);  
        // 刷新名人列表  
        await fetchFamousPeople();  
        centerDialogVisible.value = false;  

        // 显示成功提示  
        ElMessage.success("名人信息修改成功！");  
    } catch (error) {  
        console.error("修改失败", error);  
        alert("修改失败，请稍后再试。");  
    }  
}  

/**
 * 删除名人信息
 *
 * 请求参数：
 * person_id: number
 * 响应参数：
 * 无
 */
const deleteFamousPeople = async (id) => {  
    try {  
        // 添加确认提示  
        if (!confirm('确认删除该名人吗？')) {  
            return;  
        }  

        const url = "http://localhost:8081/api/famousPeople/deleteFamousPeople"  
        const response = await axios.post(url, { id }, {  
            headers: {  
                'Content-Type': 'application/json',  
            }  
        });  

        console.log("删除成功", response.data);  
        // 刷新名人列表  
        await fetchFamousPeople();  

        // 显示成功提示  
        ElMessage.success("名人删除成功！");  
    } catch (error) {  
        console.error("删除失败", error);  
        alert("删除失败，请稍后再试。");  
    }  
}  
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

.imgBox {
    width: 100%;
    height: 13%;
}

.descriptionBox {
    width: 100%;
    height: 40%;
}

.upload {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

::v-deep .el-form-item__label {
    font-size: 1.1rem;
}
</style>