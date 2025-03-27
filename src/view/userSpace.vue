<script setup>
import useUserInfoStore from '../stores/user';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

const userInfoStore = storeToRefs(useUserInfoStore())

const username = ref('')
const email = ref('')
const phone = ref('')
const avatar = ref('')

/**
 * 更新用户名称
 * 
 * 请求参数：
 * user_id:String,
 * username:String
 * 
 * 响应参数：
 * 是否更新成功
 */
const updataUserName = async () => {

    try {

        const url = "http://localhost:8081/updateUsername"
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
            username: username.value
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("响应修改名称", response.data);


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}

/**
 * 更新用户邮箱
 * 
 * 请求参数：
 * user_id:String,
 * email:String
 * 
 * 响应参数：
 * 是否更新成功
 */
const updataEmail = async () => {

    try {

        const url = "http://localhost:8081/updateEmail"
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
            email: email.value
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("响应修改邮箱", response.data);


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}


/**
 * 更新用户电话
 * 
 * 请求参数：
 * user_id:String,
 * phone:String
 * 
 * 响应参数：
 * 是否更新成功
 */
const updataPhone = async () => {

    try {

        const url = "http://localhost:8081/updatePhone"
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
            phone: phone.value
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("响应修改电话", response.data);


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}


/**
 * 更新用户头像
 * 
 * 请求参数：
 * user_id:String,
 * avatar:String
 * 
 * 响应参数：
 * 是否更新成功
 */
const updataAvatar = async () => {

    try {

        const url = "http://localhost:8081/"
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
            avatar: avatar.value
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("响应修改头像", response.data);


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}


</script>

<template>
    <div class="spaceBox">
        <div class="harfBox">
            <div class="box img">
            </div>
            <div class="box name">
                <span>昵称</span>
                <input type="text" class="read" readonly v-model="userInfoStore.username.value">
            </div>
            <div class="box email">
                <span>邮箱</span>
                <input type="email" class="read" readonly v-model="userInfoStore.email.value">
            </div>
            <div class="box phone">
                <span>电话</span>
                <input type="text" class="read" readonly v-model="userInfoStore.phone.value">
            </div>
        </div>
        <div class="harfBox">
            <div class="box img"></div>
            <div class="box name">
                <input type="text" class="update" v-model="username">
                <button class="updateButton" @click="updataUserName">修改</button>
            </div>
            <div class="box email">
                <input type="email" class="update" v-model="email">
                <button class="updateButton"@click="updataEmail">修改</button>
            </div>
            <div class="box phone">
                <input type="text" class="update" v-model="phone">
                <button class="updateButton" @click="updataPhone">修改</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.spaceBox {
    height: 90%;
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: row;
}

.harfBox {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 10%;
    box-sizing: border-box;
}

.box {
    height: 12%;
    width: 70%;
    margin-bottom: 5%;
    margin-top: 2%;
    border-radius: 5px;
    border: 4px solid rgba(112, 128, 144, 0.26);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-right: 10%;
    box-sizing: border-box;
}

.img {
    height: 150px;
    width: 150px;
    background-color: silver;
}

.box input {
    height: 35%;
    width: 70%;
    border-radius: 5px;
    border: 1px solid black;
}

.read {
    background-color: rgba(192, 192, 192, 0.779);
}

.box span {
    margin-left: 5%;
    font-size: 1.2rem;
}

.updateButton {
    height: 50px;
    width: 70px;
    background-color: rgba(0, 255, 255, 0.356);
    border-radius: 10px;
    cursor: pointer;
}

.update {
    margin-left: 10%;
    margin-right: 8%;
}
</style>