<script setup>

</script>

<template>
<div class="title">
            <div class="logo"><img src="../assets/logo.jpg"></div>
            <div class="system_name"><p>旅游平台管理端</p></div>
            <div class="list">
                <!--这些也要实现页面跳转-->
                <span><a href="#" class="a1" target="_blank">景点列表</a></span>
                <span><a href="#" class="a2" target="_blank">名人列表</a></span>
                <span><a href="#" class="a3" target="_blank">土特产列表</a></span>
                <span><a href="#" class="a4" target="_blank">帖子列表</a></span>
                <span><a href="#" class="a5" target="_blank">评论列表</a></span>
            </div>
            <div class="adm">
                <!--插入管理员登录页面-->
                <span class="login"><a href="#">管理员登录</a></span>
            </div>
</div>
</template>

<style scoped>
    .title{
    background-color: white;
    height: 70px;
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

.adm{
    position: absolute;
    display: inline-block;
    right: 200px;
    margin-top: 22px;
    color: #ff9d00;
}

.login:hover{
    opacity: 0.7;
    text-decoration: underline;
    font-weight: bolder;
}
</style>