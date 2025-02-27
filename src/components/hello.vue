<script setup>

import { ref } from 'vue';
import axios from 'axios';

// let name=ref("无数据");

// function getName(){
//     try {
//     let res=axios.get('http://localhost:8081/test/name');
//     name.value=res.data;
//     } catch (error) {
//     alert("失败");
//     }
// }


const users =ref();
const getUser=async()=>{

    try {
const response= await axios.get('http://localhost:8081/teach/getusers');
console.log('响应:',response.data);
    users.value=response.data;
    } catch (error) {
    console.error('出错',error);
    }
};



</script>

<template>
  <button @click="sendMsg">发送msg</button>
 <button @click="getUser">获取一个User</button>

 <ul v-if="users">

  <li v-for="(user,index) in users" :key="index">
    <p>{{ user.name }}</p>
    <p>{{ user.age }}</p>
    <p>{{ user.city }}</p>
  </li>

 </ul>
</template>

<style scoped>
button{
    width: 100px;
    height: 70px;
}
</style>