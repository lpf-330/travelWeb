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

const showType = "attractionsDetails"


let fetchAttractions = async () => {

  try {

    const url = "http://localhost:8081/getAttractions"
    const response = await axios.post(url, {
    },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    console.log("响应登录", response.data);



  } catch (error) {
    console.error("出错", error);
    alert("加载失败，请稍后再试。"); // 友好的错误提示  

  }

}

fetchAttractions();

// 地名和对应的景点信息  
let locations = [
  {
    name: "南昌",
    attractions: [
      {
        id: 9,
        name: "滕王阁",
        pic: "https://via.placeholder.com/200",
        message: "滕王阁是唐代诗人王勃所作《滕王阁序》的阁楼。",
      },
      {
        id: 4,
        name: "南昌八一纪念馆",
        pic: "https://via.placeholder.com/200",
        message: "南昌八一纪念馆是为纪念八一南昌起义而设立的。",
      },
    ],
  },
  {
    name: "九江",
    attractions: [
      {
        id: 1,
        name: "庐山",
        pic: "https://via.placeholder.com/200",
        message: "庐山是中国著名的风景名胜区。",
      },
    ],
  },
  {
    name: "赣州",
    attractions: [
      {
        id: 7,
        name: "赣州古城",
        pic: "https://via.placeholder.com/200",
        message: "赣州古城是客家文化的重要发源地。",
      },
    ],
  },
  {
    name: "上饶",
    attractions: [
      {
        id: 11,
        name: "三清山",
        pic: "https://via.placeholder.com/200",
        message: "三清山以其奇特的岩石和美丽的风景而闻名。",
      },
    ],
  },
];

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
  height: 88%;
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