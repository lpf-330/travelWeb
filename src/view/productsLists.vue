<template>
  <div class="products-list">
    <div class="showlist-container">
      <Production v-for="(value) in products" :id="value.id" :toLink="toLink"></Production>

    </div>


    <!-- Checkout Modal -->

  </div>
</template>

<script setup>
import { ref } from 'vue';
import Production from '../components/Production.vue'
import useProductionsStore from '../stores/productions';
import { storeToRefs } from 'pinia';

let {shopCart,productions} =storeToRefs(useProductionsStore)

useProductionsStore().addProduction(1,1,1,2,1,1,1,1)

const toLink="productDetails"

//let productsID=ref("") 以免你忘了特产也有ID

// 示例的土特产数据  
let products = ref([
  {
    id:"1",
    name: "特产A",
    price: 100,
    pic: "https://via.placeholder.com/200",
    message: "特产A的介绍",
    available: true,  // 售卖情况  
  },
  {
    id:"2",
    name: "特产B",
    price: 200,
    pic: "https://via.placeholder.com/200",
    message: "特产B的介绍",
    available: false,  // 售罄  
  },
  {
    id:"3",
    name: "特产C",
    price: 150,
    pic: "https://via.placeholder.com/200",
    message: "特产C的介绍",
    available: true,
  },
]);

// let selectedProducts = ref([]); // 存储已选择的土特产  
// let totalPrice = ref(0);


// 跳转到特产详情页  
// let goToDetail = (product) => {
//   console.log('跳转到详情页面，产品：', product.name);
// };  
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