<script setup>
import useUserInfoStore from '../stores/user';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import router from '../router';

const userInfoStore=useUserInfoStore()

const {userName}=storeToRefs(userInfoStore)

const userInfoPage=()=>{
    router.push('/index/userInfo/userSpace')
}

</script>


<template>
<div class="title">
            <div class="logo"><img src="../assets//picture/logo.jpg"></div>
            <div class="system_name"><p>江西省旅游平台</p></div>
            <div class="list">
                <!--这些也要实现页面跳转-->
                <span><router-link to="/index/indexView" class="a1">首页</router-link></span>
                <span><router-link to="/index/attractions" class="a2">风景名胜</router-link></span>
                <span><router-link to="/index/products" class="a4">土特产</router-link></span>
                <span><router-link to="/index/community" class="a5">社区</router-link></span>
                
            </div>
            <div class="user" @click="userInfoPage()">
                <div class="userImg"></div>
                <span>{{ userName }}</span>
            </div>
            
</div>
</template>

<style scoped>
.title{
    background-color: white;
    height: 70px;
    margin-top: 0.2%;
    box-shadow: 0 5px 10px rgba(169, 169, 169, 0.189);
    margin-bottom: 2%;
}

.logo{
    margin-left: 50px;
    height: 100%;
    display: inline-block;
}

.logo img{
    width: 100%;
    height: 90%;
}

.system_name{
    position: absolute;
    height: 70px;
    display: inline-block;
    margin-left: 10px;
    text-align: center;
    font-size: 20px;
}

.list{
    position: absolute;
    display: inline-block;
    margin-left: 250px;
    margin-top: 22px;
}

.list span{
    padding-right: 30px;
    color: black;
    font-size: 17px;
}

.list span:hover{
    opacity: 0.7;
    text-decoration: underline;
    color: #ff9d00;
}

a{
    color: inherit;
    text-decoration: none;
}

.user{
    position: absolute;
    top: 1.5%;
    right: 6%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-width: 100px;
    width: 7%;
    cursor: pointer;
}

.userImg{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #ff9d00;
}

.user span{
    font-size: 1.2rem;
}

</style>