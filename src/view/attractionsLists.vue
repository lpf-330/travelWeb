<template>
  <div class="container">
    <div class="sidebar">
      <div class="sideBox" @click="selectLocation(locations[key])" v-for="(value, key) in locations">{{ value.name }}
      </div>
    </div>
    <div class="content">
      <ShowList :showType="showType" :showLists="showLists" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ShowList from '../components/ShowList.vue'; // 导入 ShowList 组件  
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const showType = "attractionsDetails"


const locations = ref([]);  

  /**
   * 获取景点数据
   * 
   * 请求参数：
   * 无
   * 
   * 响应参数：
   * locations:[{
   *    loaction,
   *    attractions:[{
   *      attraction_id,
   *      name,
   *      description,
   *      image,
   *      },...]
   * },...],
   * 
   */
const fetchAttractions = async () => {  
  try {  
    const response = await axios.post("http://localhost:8081/Attractions/fetchAttractions");  
    if (response.data) {  
      locations.value = response.data.map(item => ({  
        name: item.location,  
        attractions: item.attractions.map(attraction => ({  
        id: attraction.attraction_id,  
        name: attraction.name,  
        message: attraction.description,  
        pic: attraction.image  
      }))  
      }));  
    }  
    console.log("获取数据成功:", response.data);  
  } catch (error) {  
    console.error("获取数据失败:", error);  
  }  
};  

fetchAttractions();   

// 用来做测试的假数据
// let locations=[
//   {
//     name: "北京",
//     attractions: [
//       {
//         id: 1,
//         name: "故宫",
//         message: "hhh",
//         pic: "https://cdn.pixabay.com/photo/2014/06/19/16/55/the-imperial-garden-483076_1280.jpg"
//       },
//     ]
//   }];

                                  

let selectedLocation = ref(null);
let showLists = ref([]);

let selectLocation = (location) => {
  selectedLocation.value = location;
  showLists.value = location ? location.attractions : [];
};  
</script>

<style scoped>
.container {
  display: flex;
  height: 92.5%;
}

.sidebar {
  border-radius: 0.8rem;
  margin-left: 1rem;
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  border-right: 1px solid #ddd;
  height: 92%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.sideBox {
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
  cursor: pointer;
  padding-top: 10%;
  padding-bottom: 10%;
  margin-bottom: 10%;
}

.sideBox:hover {
  background-color: #c4c4c4;
  border-radius: 0.4rem;
  transition: all 0.5s ease-in-out;
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