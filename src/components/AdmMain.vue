<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="title">
        <div class="logo"><img src="../assets/picture/logo.jpg"></div>
        <div class="system_name">
            <p>江西旅游平台管理端</p>
        </div>
        <div class="list">
            <!--这些也要实现页面跳转-->
            <span>
                <RouterLink class="a1" :to="{ name: 'admScenic' }">景点列表</RouterLink>
            </span>
            <span>
                <RouterLink class="a2" :to="{ name: 'admCelebrity' }">名人列表</RouterLink>
            </span>
            <span>
                <RouterLink class="a3" :to="{ name: 'admLocal' }">土特产列表</RouterLink>
            </span>
            <span>
                <RouterLink class="a4" :to="{ name: 'admPost' }">帖子列表</RouterLink>
            </span>
            <span>
                <RouterLink class="a5" :to="{ name: 'admCheck' }">订单处理</RouterLink>
            </span>
        </div>
    </div>
</template>

<style scoped>
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

.login:hover {
    opacity: 0.7;
    text-decoration: underline;
    font-weight: bolder;
}
</style>