<script setup>
import useUserInfoStore from '../stores/user';
import { storeToRefs } from 'pinia';
import axios from 'axios';


const user=storeToRefs(useUserInfoStore()).user.value.data
 

let updateUser=async(user_id,username)=>{
try {
    
  
     const url = `http://localhost:8081/userInfo?user_id=${encodeURIComponent(user_id)}&username=${encodeURIComponent(username)}`; // 通过查询字符串拼接 URL  
        
        // 发送 GET 请求  
        const response = await axios.post(url);  
        
   
        
        console.log("响应",response.data);
       



  } catch (error) {
     console.error("出错", error);  
    alert("加载失败，请稍后再试。"); // 友好的错误提示  
    
  }
  


}


const updateUserName=()=>{
    const user_id=user.user_id
    const username=document.querySelector('#userName').value
    
    updateUser(user_id,username)
    user.username=username
}



</script>

<template>
    <div class="spaceBox">
        <div class="harfBox">
            <div class="box img">
            </div>
            <div class="box name">
                <span>昵称</span>
                <input type="text" class="read" readonly v-model="user.username">
            </div>  
            <div class="box email">
                <span>邮箱</span>
                <input type="email" class="read" readonly v-model="user.email">
            </div>
            <div class="box phone">
                <span>电话</span>
                <input type="text" class="read" readonly v-model="user.phone">
            </div>
        </div>
        <div class="harfBox">
            <div class="box img"></div>
            <div class="box name">
                <input type="text" class="update" id="userName">
                <button class="updateButton" @click="updateUserName">修改</button>
            </div>  
            <div class="box email">
                <input type="email" class="update">
                <button class="updateButton">修改</button>
            </div>
            <div class="box phone">
                <input type="text" class="update">
                <button class="updateButton">修改</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.spaceBox{
    height: 90%;
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction:row;
}

.harfBox{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 10%;
    box-sizing: border-box;
}

.box{
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

.img{
    height: 150px;
    width: 150px;
    background-color: silver;
}

.box input{
    height: 35%;
    width: 70%;
    border-radius: 5px;
    border: 1px solid black;
}

.read{
    background-color: rgba(192, 192, 192, 0.779);
}

.box span{
    margin-left: 5%;
    font-size: 1.2rem;
}

.updateButton{
    height: 50px;
    width: 70px;
    background-color: aqua;
    border-radius: 10px;
}

.update{
    margin-left: 10%;
    margin-right: 8%;
}
</style>