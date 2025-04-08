<template>  
    <div class="famous-person-detail">
    <h1 class="person-title">{{ person.name }}</h1>
      <div class="date-info">  
        <span><strong>创建时间:</strong> {{ createdAt }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  
        <span><strong>更新时间:</strong> {{ updatedAt }}</span>  
      </div>  
  
      <div class="box">
        <div class="image-container">  
        <img :src="person.image" alt="Person's Image" class="person-image" />  
      </div>  
  
      <div class="biography">   
        <p>{{ person.biography }}</p>  
      </div>
      </div>

    </div>  
  </template>  
  
  <script setup>  
  import { ref, onMounted } from 'vue';  
  import { useRoute } from 'vue-router';  

  const route = useRoute(); 

  const person = ref({});  

  onMounted(() => {  
    // 从 route.state 中获取 person 对象  
    console.log("快出来",history.state);  
    if (history.state && history.state.person) {
      person.value = history.state.person;   
    } else {  
      console.warn("没有在 route.state 中找到名人数据");  
    }  
  });  
  // // 假设我们有一个名人数据对象  
  // let person = ref({  
  //   name: "李白",  
  //   picture: "https://via.placeholder.com/750",  
  //   biography: "李白是唐代著名的诗人，被称为‘诗仙’。他以豪放飘逸的诗风著称，作品广泛流传。",  
  // });  
  
  // 创建时间和更新时间  
  let createdAt = ref("2024-01-01");  
  let updatedAt = ref("2024-12-01");  

  </script>  
  
  <style scoped>  
  .famous-person-detail {  
    max-width: 95%;  
    margin: auto;  
    padding: 20px;  
    border: 1px solid #ccc;  
    border-radius: 8px;  
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  
  }  
  
 .person-title{
    text-align: center;
 }

  .date-info {  
    margin-bottom: 20px;  
    font-size: 0.9em;  
    color: #555;
    text-align: center;  
  }  
  
  .box{
    height: 60%;
    width: 92%;
    min-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .image-container {  
    text-align: center;  
    height: 400px;
    width: 400px;  
  }  
  
  .person-image {  
    width: 90%;  
    height: 90%;  
    border-radius: 8px;  
  }  
  
  .biography {  
    margin-bottom: 20px;
    text-align: center;
    padding-left: 50px;
    padding-right: 50px;
    box-shadow: 0px 0.5vh 1vh 0 #acacac;
    border-radius: 10px;
  }  
  
  h2 {  
    font-size: 1.5em;  
    margin-bottom: 10px;  
  }
  
  .likes{
    text-align: center;
  }
  </style>