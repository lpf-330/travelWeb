<template>
  <div class="products-list">
    <div class="showlist-container">
      <Production v-for="(value) in products" :data="value" :toLink="toLink"></Production>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import Production from '../components/Production.vue'
import axios from 'axios';


const products = ref([])

const toLink = "productDetails"

let fetchProductsList = async () => {

  try {

    const url = "http://localhost:8081/getProducts"
    const response = await axios.post(url, {
    },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    for (let i = 0; i < response.data.length; i++) {
      products.value.push({
        id: response.data[i].product_id,
        name: response.data[i].name,
        price: response.data[i].price,
        pic: response.data[i].image,
        message: response.data[i].message,
        stock: response.data[i].stock
      })
    }


  } catch (error) {
    console.error("出错", error);
    alert("加载失败，请稍后再试。"); // 友好的错误提示  

  }

}

fetchProductsList()



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