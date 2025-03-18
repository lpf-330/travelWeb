<template>  
    <div class="product-detail">  
      <h1 class="product-title">{{ production.name }}</h1>  
      <div class="date-info">  
        <span><strong>创建时间:</strong> {{ production.created_at }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>  
        <span><strong>更新时间:</strong> {{ production.updated_at }}</span>  
      </div>  
  
      <div class="box">
            <div class="image-container">  
                <img :src="'src/assets/picture/production/'+production.product_id+'.jpg'" alt="Product Image" class="product-image" />
                </div>

            <div class="boxInfo">
                <div class="description">  
                    <h2>产品介绍</h2>  
                    <p>{{ production.message }}</p>  
                </div>  
  
                <div class="product-info">  
                    <p><strong>产品价格:</strong> {{ production.price }} 元</p>  
                    <p><strong>库存数量:</strong> {{ production.stock }} 件</p>   
                    <p><strong>售卖情况:</strong> {{  '在售' }}</p>  
                </div> 
            </div>
      </div> 

      <div class="tail">
        <div class="buy">购买</div>
        <!--设置事件跳转CheckoutModal.vue-->
      </div>
    </div>  
  </template>  
  
  <script setup>  
  import { ref,onMounted } from 'vue';  
  import Main from '../components/Main.vue';  
  import LikeButton from '../components/LikeButton.vue';  
  import axios from 'axios';
  import useProductionsStore from '../stores/productions';
import { storeToRefs } from 'pinia';

let productionStore=storeToRefs(useProductionsStore())
let production=productionStore.production
console.log('productionStore.production',productionStore.production);

    console.log('productionStore.production.value',productionStore.production.value);
 
  </script>  
  
  <style scoped>  
  .product-detail {  
    max-width: 95%;  
    margin: auto;  
    padding: 20px;  
    border: 1px solid #ccc;  
    border-radius: 8px;  
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  
  }  
  
  .product-title {  
    text-align: center;  
  }  
  
  .date-info {  
    margin-bottom: 20px;  
    font-size: 0.9em;  
    color: #555;  
    text-align: center;  
  }  

  .box{
    display: flex;
    flex-direction:row;
    justify-content: space-around;
  }

  

  .image-container {  
  margin-bottom: 20px;
  width: 600px
  }  
  
  .product-image {  
    width: 600px;
  height: 400PX;
  border-radius: 8px;
  }  
  
  .description {  
    margin-bottom: 20px;  
    text-align: center;  
    padding-left: 50px;  
    padding-right: 50px;  
  }  
  
  .product-info {  
    text-align: left;
  margin-left: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;  
  }  
  
  h2 {  
    font-size: 1.5em;  
    margin-bottom: 10px;  
  }  
  
  .likes {  
    text-align: center;  
  }  

  .tail{
    width: 100%;
    height: 70px;
    margin-top: 20px;
    border-radius: 8px;
    background-color: #17a4ef;
  }

  .buy{
    width: 80px;
    height: 40px;
    padding-top: 9px;
    text-align: center;
    font-size: 1.2em;  
    color: white;  
    background-color: #f00202;  
    border: none;  
    border-radius: 5px;  
    cursor: pointer;
    position: absolute;
    right: 70px;
    margin-top: 10px;  
  }

  .buy:hover{
    background-color: #ae0707;  
  }
  </style> 