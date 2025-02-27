<script setup>
import { ref } from 'vue';
import router from '../router'
import { RouterLink } from 'vue-router';

const account = ref()
const passward = ref()
const passwardTest = /^[a-zA-Z0-_]{2,11}$/

const LoginTest = () => {
  if (account.value) {
    if (passward.value) {
      if(passwardTest.test(passward.value)){
          router.push('/')
          console.log(1);
        }else{
          alert("密码必须在12个字符内，且仅限英文字母，数字和下划线") 
        }
    } else {
      alert("请输入密码")
    }
  } else {
    alert("请输入账号")
  }
}

const returnLogin=()=>{
  router.push('/')
}

</script>

<template>
  <div class="backgrand">
    <span class="iconfont icon-zuojiantou iconReturn" @click="returnLogin"></span>
    <from class="from">
      <h1>用户注册</h1>
      <input type="text" name="AccountNumber" id="account" class="account" placeholder="&nbsp&nbsp请输入账号"
        v-model="account">
      <input type="text" name="KeyWord" id="passward" class="password" placeholder="&nbsp&nbsp请输入密码" v-model="passward">
      <input type="submit" id="login" class="login" value="注册" @click="LoginTest">
      <router-link to="/"></router-link>
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

.iconReturn{
  display: inline-block;
  width: 1.8rem;
  position: absolute;
  font-size: 1.4rem;
  top: 27.5%;
  left: 32%;
  z-index: 1;
  cursor: pointer;
}

.iconReturn:hover{
  color: rgba(0, 174, 227, 0.797);
}
</style>
