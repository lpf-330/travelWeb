<script setup>
import { ref, onBeforeMount } from 'vue';
import useUserInfoStore from '../stores/user';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const userInfoStore=useUserInfoStore()

const user=storeToRefs(userInfoStore).user.value


let user_id=user.data.user_id;
console.log('user_id',user_id);


let address=ref([])

const fetchAddress=async()=>{

  try {
    
    // 获取帖子 ID  
    const url = `http://localhost:8081/userInfo/${user_id}`; // 拼接 URL  
    const response = await axios.get(url);  
  
      address.value = response.data;
    console.log('6',address.value);


  } catch (error) {
     console.error("出错", error);  
    alert("加载失败，请稍后再试。"); // 友好的错误提示  
    
  }


}

const deleteAddr=(addr_id,index)=>{
  console.log(addr_id);

  const deleteAdd=async()=>{

  try {
    
    // 获取帖子 ID  
    const url = `http://localhost:8081/userInfo/${addr_id}`; // 拼接 URL  
    const response = await axios.delete(url);  

    if(response.code===0)
  {
    alert("删除失败")
  }else{
    document.querySelectorAll('.contain')[index].remove()
    alert("删除成功")
    
  }


  } catch (error) {
     console.error("出错", error);  
    alert("加载失败，请稍后再试。"); // 友好的错误提示  
    
  }


}
  deleteAdd()
}



// onMounted(fetchAddress)
onBeforeMount(fetchAddress)

console.log("q1",address);
console.log('q2',address.value);


</script>

<template>
    <div class="box">
        <div class="contain" v-for="(value, index) in address" :key="index" >  
            <input type="text" v-model="value.address" readonly />  
            <button class="delete" @click="deleteAddr(value.addr_id,index)">删除</button>
        </div>  

    </div>

</template>

<style scoped>
.box{
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 0;
    box-shadow: none;
}

.contain{
    height: 15%;
    width: 60%;
    margin-bottom: 4%;
    margin-left: 10%;
    border-radius: 10px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    flex-direction: row;
}

.contain input{
    width: 100%;
    height: 100%;
    background-color: rgb(232, 240, 254);
    border-radius: 10px;
    border: 3px solid rgba(192, 192, 192, 0.406);
}

.delete{
  height: 45px;
  width: 80px;
  border-radius: 20px;
  background-color: crimson;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-left: 10%;
  color: aliceblue;
  font-size: 1.2rem;
}
</style>