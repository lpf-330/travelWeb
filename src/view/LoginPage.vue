<script setup>
import { ref } from 'vue';
import router from '../router'
import { RouterLink } from 'vue-router';
import useUserInfoStore from '../stores/user';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const account = ref()
const passward = ref()
const passwardTest = /^[a-zA-Z0-_]{2,11}$/

const userInfoStore = storeToRefs(useUserInfoStore())

let fetchUser = async () => {


  try {


    const url = "http://localhost:8081/userInfo"
    const response = await axios.post(url, {
      username: account.value,
      password: passward.value
    },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );



    if (response.data.code === 1) {


      router.push({ name: 'index' })
      userInfoStore.avatar.value = response.data.data.avtar
      userInfoStore.email.value = response.data.data.email
      userInfoStore.phone.value = response.data.data.phone
      userInfoStore.user_id.value = response.data.data.user_id
      userInfoStore.username.value = response.data.data.username
      console.log("响应登录", response.data);


    } else {
      alert(response.data.msg)
    }


  } catch (error) {
    console.error("出错", error);
    alert("加载失败，请稍后再试。");

  }



}

const LoginTest = () => {
  if (account.value) {
    if (passward.value) {
      if (passwardTest.test(passward.value)) {

        fetchUser()

        // router.push({ name: 'index' })
      } else {
        alert("密码必须在12个字符内，且仅限英文字母，数字和下划线")
      }
    } else {
      alert("请输入密码")
    }
  } else {
    alert("请输入账号")
  }
}

</script>

<template>
  <div class="backgrand">
    <from class="from">
      <h1>登录</h1>
      <input type="text" name="AccountNumber" id="account" class="account" placeholder="&nbsp&nbsp请输入账号"
        v-model="account">
      <input type="text" name="KeyWord" id="passward" class="password" placeholder="&nbsp&nbsp请输入密码" v-model="passward">
      <input type="submit" id="login" class="login" value="登录" @click="LoginTest">
      <div class="linkBox">
        <router-link to="/admLogin" class="link">管理员登录</router-link>
        <router-link to="/register" class="link">用户注册</router-link>
      </div>
    </from>
  </div>
</template>

<style scoped>
.backgrand {
  width: 100%;
  height: 100%;
  background-color: #acacac57;
}

.from {
  padding-top: 10%;
  border: 1%;
  border-radius: 1rem;
  display: inline-block;
  position: fixed;
  top: 50%;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  height: 50%;
  width: 38%;
  margin: 0;
  padding: 0;
  text-align: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0.5vh 1vh 0 #acacac;
}

.from h1 {
  font-size: 2.5rem;
  position: relative;
  top: -8%;
}

.account,
.password {
  position: relative;
  top: -5%;
  width: 40%;
  height: 6%;
  border-radius: 2rem;
  border-width: 0.2rem;
  padding-left: 2%;
  margin-bottom: 4%;
  font-size: 1rem;
  border-color: #e1e1e13e;
}

.login {
  width: 40%;
  height: 8%;
  font-size: 1.4rem;
  color: #fff;
  border-radius: 2rem;
  background-color: rgb(0, 140, 255);
  box-shadow: 0px 0.5vh 0.5vh 0 rgba(0, 140, 255, 0.63);
  border: 0;
  cursor: pointer;
}

.link {
  font-size: 0.8rem;
  text-decoration: none;
}

.linkBox {
  width: 30%;
  margin-top: 2%;
}

.linkBox a:nth-of-type(1) {
  margin-right: 5%;
}

.linkBox a:nth-of-type(2) {
  margin-left: 5%;
}
</style>
