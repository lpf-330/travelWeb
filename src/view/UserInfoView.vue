<script setup>
import { RouterView } from 'vue-router';
import router from '../router';

const toUserSpace = () => {
    router.push('userSpace')
}

const toAddress = () => {
    router.push('address')
}

</script>

<template>
    <div class="box">
        <div class="router">
            <div class="sbox" @click="toUserSpace"><span>个人信息</span></div>
            <div class="sbox" @click="toAddress"><span>收货地址</span></div>
        </div>
        <div class="container">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style scoped>
.box {
    max-width: 92%;
    min-width: 1300px;
    margin: auto;
    text-align: center;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    height: 80%;
    display: flex;
    justify-content: space-between;
}

.router {
    height: 100%;
    width: 15%;
    background-color: #b9b9b947;
    border-radius: 8px 0 0 8px;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sbox {
    width: 90%;
    height: 8%;
    margin: 5% auto 5% auto;
    border-radius: 10px;
    display: flex;
    cursor: pointer;
}

.sbox:hover {
    background-color: #ccc;
}

.sbox span {
    margin: auto;
    font-size: 1.4rem;
}

.container {
    height: 100%;
    width: 80%;
    border-radius: 25px;
    border: 1px solid #ccc;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
    display: flex;
}
</style>