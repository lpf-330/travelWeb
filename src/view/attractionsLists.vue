<template>
<div class="container">  
    <div class="sidebar">  
        <div class="sideBox" @click="selectLocation(locations[key])" v-for="(value,key) in locations">{{ value.location }}</div>
    </div>  
    <div class="content">  
      <ShowList :showType="showType" :showLists="showLists" />  
    </div>  
  </div>  
</template>

<script setup>
import {ref,onMounted} from 'vue';
import axios from 'axios';
import ShowList from '../components/ShowList.vue'; // 导入 ShowList 组件  


const showType="attractionsDetails" 






let locations=ref([]);

const fetchAttraction=async()=>{

  try {
    
    const response=await axios.get('http://localhost:8081/Attractions/getAttractions')
    console.log('响应', response.data);  
    locations.value = response.data;
    console.log(locations);
    
  } catch (error) {
     console.error("出错", error);  
    alert("加载失败，请稍后再试。"); // 友好的错误提示  
    
  }


}

onMounted(fetchAttraction)





let selectedLocation = ref(null);  
let showLists = ref([]);  

let selectLocation = (location) => {  
  selectedLocation.value = location;  
  // 更新 showLists 根据选中地点的 attractions  
  showLists.value = location ? location.attractions : [];  
};  
</script>

<style scoped>
.container {  
  display: flex; 
  height: 92.5%;
}  

.sidebar {  
  width: 250px;  
  background-color: #f0f0f0;  
  padding: 20px;  
  border-right: 1px solid #ddd;
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction:column;  
}  

.sideBox{
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
  cursor: pointer;
  padding-top: 7.5%;
  padding-bottom: 7.5%;
  margin-bottom: 10%;
}

.sideBox:hover{
  background-color: #c4c4c4;
}

.sidebar h2 {  
  margin-top: 0;  
}  

.sidebar ul {  
  list-style-type: none;  
  padding: 0;  
}  

.sidebar li {  
  padding: 10px;  
  cursor: pointer;  
}  

.sidebar li:hover {  
  background-color: #e0e0e0;  
}  

.sidebar li.active {  
  background-color: #d0d0d0;  
}  

.content {  
  flex: 1;  
  padding: 20px;  
}




</style>