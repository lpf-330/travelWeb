<template>
  <div class="products-list">
    <div class="showlist-container">
      <Production v-for="(value) in products" :production="value" :toLink="toLink"></Production>

    </div>



  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import Production from '../components/Production.vue'
import axios from 'axios';





const toLink="productDetails"





let products=ref([])


const fetchproducts=async()=>{

  try {
    
    const response=await axios.get('http://localhost:8081/product/getProducts')
    console.log('响应', response.data);  
    products.value = response.data;
    
    
  } catch (error) {
     console.error("出错", error);  
    alert("加载失败，请稍后再试。"); // 友好的错误提示  
    
  }


}

onMounted(fetchproducts)
 
</script>

<style scoped>
.products-list {
  max-width: 92%;
  min-width: 1300px;
  min-height: 600px;
  height: 80%;
  margin: auto;
  text-align: center;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.showlist-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 7%;
  column-gap: 5%;
  height: 80%;
}
</style>