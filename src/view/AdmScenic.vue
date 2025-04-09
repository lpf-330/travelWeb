<template>
    <div class="container">
        <h1>景点列表</h1>
        <div class="scrollbarBox" id="scenery-list">
            <el-scrollbar>
                <div class="scenery-item" v-for="(scenery, index) in sceneryList" :key="scenery.id">
                    <div class="image-placeholder">
                        <img :src="'src/assets/picture/picture_package/attraction/' +scenery.attraction_id+'.jpg'">
                    </div>
                    <div class="scenery-description">
                        <h2>{{ scenery.name }}</h2>
                        <p>{{ scenery.description }}</p>
                    </div>
                    <div class="button-group">
                        <button class="modify-button"
                            @click="centerDialogVisible = true; updataScenery(scenery)">修改</button>
                        <button class="delete-button" @click="">删除</button>
                    </div>
                </div>

                <button class="addButton" @click="centerDialogVisible = true; addScenery()">增加</button>
            </el-scrollbar>

        </div>
    </div>

    <el-dialog v-model="centerDialogVisible" title="景点内容" width="50rem" align-center>
        <el-form label-position="left" v-model="form" class="fromBox">
            <div class="nameBox formItem">
                <el-form-item label="景点名称" class="formItemBox">
                    <el-input v-model="form.name" style="height: 60%;width: 100%;" />
                </el-form-item>
            </div>
            <div class="imgBox formItem">
                <el-form-item label="景点图像" class="formItemBox">
                    <el-upload ref="uploadRef" class="upload" :auto-upload="false">
                        <template #trigger>
                            <el-button type="primary">选择文件</el-button>
                        </template>

                        <el-button class="ml-3" type="success" @click="submitUpload">
                            提交到服务器
                        </el-button>

                    </el-upload>
                </el-form-item>
            </div>
            <div class="descriptionBox formItem">
                <el-form-item label="景点介绍" class="formItemBox">
                    <el-input type="textarea" :rows="7" v-model="form.description" style="height: 85%;width: 100%;" />
                </el-form-item>
            </div>
            <div class="famousPeopleBox formItem">
                <el-form-item label="相关名人" class="formItemBox">
                    <el-select-v2 v-model="selectedFamousPeople" :options="famousPeople" placeholder="Please select"
                        style="height: 60%;width: 100%;" multiple collapse-tags collapse-tags-tooltip />
                    <!-- <el-input v-model="form.famousPeople" style="height: 60%;width: 90%;" /> -->
                </el-form-item>
            </div>
            <div class="openingBox formItem">
                <el-form-item label="开放时间" class="formItemBox">
                    <el-input v-model="form.opening" style="height: 60%;width: 100%;" />
                </el-form-item>
            </div>
            <div class="transportationBox formItem">
                <el-form-item label="交通方式" class="formItemBox">
                    <el-input v-model="form.transportation" style="height: 60%;width: 100%;" />
                </el-form-item>
            </div>
            <div class="locationBox formItem">
                <el-form-item label="详细地址" class="formItemBox">
                    <el-input type="textarea" :rows="2" v-model="form.location" style="height: 80%;width: 100%;" />
                </el-form-item>
            </div>
        </el-form>
        <template #footer>
            <div class="dialog-footer footer">
                <el-button class="cancelbutton" type="primary" @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false; addOrUpdata()">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>


<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue'
import axios from 'axios';



// const famousPeople = Array.from({ length: 1000 }).map((_, idx) => ({
//     value: `Option ${idx + 1}`,
//     label: `${initials[idx % 10]}${idx}`,
// }))

const selectedFamousPeople = ref([])
const famousPeople = ref([])

const form = ref({
    name: '',
    description: '',
    famousPeople: [],
    opening: '',
    transportation: '',
    location: '',
    attraction_id: -1,   //-1则为新增
})
const centerDialogVisible = ref(false)

const scenery = ref([])
const sceneryList = ref([])


const addScenery = () => {
    form.value.attraction_id = -1
    form.value.description = ''
    form.value.famousPeople = []
    form.value.opening = ''
    form.value.transportation = ''
    form.value.name = ''
    form.value.location = ''
}

const updataScenery = (scenery) => {
    form.value.attraction_id = scenery.attraction_id
    fetchAttractionDetail(form.value.attraction_id)
    // form.value.description = scenery.description
    // form.value.famousPeople = scenery.scenery
    // form.value.opening = scenery.opening
    // form.value.transportation = scenery.transportation
    // form.value.name = scenery.name
    // form.value.location = scenery.location

}

const addOrUpdata = () => {
    if (form.value.attraction_id === -1) {
        handleAddScenery()
    } else {
        handleModifyScenery(form.value.attraction_id)
    }
}


/**
 * 获取景点列表
 * 
 * 请求参数：
 * 无
 * 
 * 响应参数：
 * scenery:[{
 *  attraction_id: 景点ID
 *  name: 景点名称
 *  description: 景点介绍
 *  image: 景点图像
 * },...]
 * 
 */
const fetchSceneries = async () => {
    try {
        scenery.value = [];
        sceneryList.value = [];
        const url = "http://localhost:8081/Attractions/fetchAttractions"
        const response = await axios.post(url, {}, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log("响应景点", response.data);

        for (let i = 0; i < response.data.length; i++) {
            for (let j = 0; j < response.data[i].attractions.length; j++) {
                sceneryList.value.push(response.data[i].attractions[j])
            }
        }
        console.log('sceneryList', sceneryList);

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。");
    }
}
fetchSceneries();


const fetchAttractionDetail = async (attraction_id) => {
    try {
        const url = "http://localhost:8081/Attractions/fetchAttractionDetail"
        const response = await axios.post(url, {
            attraction_id: attraction_id
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });



        form.value.description = response.data.description
        form.value.famousPeople = response.data.scenery
        form.value.opening = response.data.opening
        form.value.transportation = response.data.transportation
        form.value.name = response.data.name
        form.value.location = response.data.location
        console.log("响应form.value", form.value);

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。");
    }
}


/**
 * 获取某个景点对应的名人关系
 * 
 * 请求参数：
 * attraction_id:Int
 * 
 * 响应参数：
 * selectedFamousPeople:[{
 *  person_id,
 *  name
 * },...]
 */
const fetchRelation = async (attraction_id) => {
    try {
        const url = "http://localhost:8081/"
        const response = await axios.post(url, {
            attraction_id: attraction_id
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log("响应景点对应的名人关系", response.data);


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。");
    }
}


/**
 * 获取名人列表
 * 
 * 请求参数：
 * 
 * 响应参数：
 * famousPeople[{
 *  id: 名人ID
 *  name: 名人名称
 * },...]
 * 
 */
const fetchFamousPeople = async () => {
    try {
        const url = "http://localhost:8081/FamousPeople/fetchFamousPeople"
        const response = await axios.post(url, {}, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log("响应名人列表", response.data);
        famousPeople.value = response.data

    } catch (error) {
        console.error("获取名人列表失败", error);
        alert("获取名人列表失败，请稍后再试。");
    }
}
fetchFamousPeople();

/**
 * 添加景点
 * 
 * 请求参数：
 * name: 景点名称
 * description: 景点介绍
 * location: 景点地址
 * opening: 开放时间
 * transportation: 交通方式
 * famousPeople: 相关名人ID列表
 * 
 * 
 * 响应参数：
 * scenery{
 *  attraction_id: 景点ID
 *  name: 景点名称
 *  description: 景点介绍
 *  image: 景点图像
 *  sceneryList{
 *      location: 景点地址
 *      opening_hours: 开放时间
 *      transportation: 交通方式
 *      person_id: 名人ID
 *      name: 名人名称
 *  }
 * }

 */
const handleAddScenery = async () => {
    try {
        const url = "http://localhost:8081/api/sceneries/addScenery"
        // 准备提交的数据  
        const formData = {
            name: form.value.name,
            description: form.value.description,
            location: form.value.location,
            opening: form.value.opening,
            transportation: form.value.transportation,
            famousPeople: selectedFamousPeople.value
        };
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log("添加成功", response.data);
        // 刷新景点列表  
        await fetchSceneries();
        centerDialogVisible.value = false;

    } catch (error) {
        console.error("添加失败", error);
        alert("添加失败，请稍后再试。");
    }
}

/**
 * 修改景点信息
 * 
 * 请求参数：
 * attraction_id: 景点ID
 * name: 景点名称
 * description: 景点介绍
 * location: 景点地址
 * opening: 开放时间
 * transportation: 交通方式
 * famousPeople: 相关名人ID列表
 * 
 * 响应参数：
 * scenery{
 *  attraction_id: 景点ID
 *  name: 景点名称
 *  description: 景点介绍
 *  image: 景点图像
 *  sceneryList{
 *      location: 景点地址
 *      opening_hours: 开放时间
 *      transportation: 交通方式
 *      person_id: 名人ID
 *      name: 名人名称
 *  }
 * }
 * 
 */
const handleModifyScenery = async (id) => {
    try {
        const url = "http://localhost:8081/api/sceneries/modifyScenery"
        // 准备提交的数据  
        const formData = {
            attraction_id: id,
            name: form.value.name,
            description: form.value.description,
            location: form.value.location,
            opening_hours: form.value.opening,
            transportation: form.value.transportation,
            famousPeople: form.value.famousPeople
        };
        const response = await axios.post(url, formData, {
            id: id
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log("修改成功", response.data);
        // 刷新景点列表  
        await fetchSceneries();
        centerDialogVisible.value = false;
    } catch (error) {
        console.error("修改失败", error);
        alert("修改失败，请稍后再试。");
    }
}

/**
 * 删除景点信息
 * 
 * 请求参数：
 * attraction_id: 景点ID
 * 
 * 响应参数：
 * 无
 * 
 */
const deleteScenery = async (id) => {
    try {
        const url = "http://localhost:8081/api/sceneries/deleteScenery"
        const response = await axios.post(url, { id }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log("删除成功", response.data);
        // 刷新景点列表  
        await fetchSceneries();

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
    width: 12rem;
    height: 12rem;
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

.image-placeholder img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.scenery-description {
    flex: 1;
    text-align: justify;
    hyphens: auto;
    padding-right: 1.5rem;
    overflow: hidden;
    height: 8.5rem;
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

.nameBox {
    width: 100%;
    height: 10%;
}

.imgBox {
    width: 100%;
    height: 15%;
}

.descriptionBox {
    width: 100%;
    height: 30%;
}

.famousPeopleBox {
    width: 100%;
    height: 10%;
}

.openingBox {
    width: 100%;
    height: 10%;
}

.transportationBox {
    width: 100%;
    height: 10%;
}

.locationBox {
    width: 100%;
    height: 15%;
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

::v-deep .el-form-item__label {
    font-size: 1.1rem;
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

::v-deep .el-select__wrapper {
    height: 100%;
}

.upload {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>