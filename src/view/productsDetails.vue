<template>
  <div class="product-detail">
    <h1 class="product-title">{{ product.name }}</h1>
    <div class="date-info">
      <span><strong>创建时间:</strong> {{ createdAt }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span><strong>更新时间:</strong> {{ updatedAt }}</span>
    </div>

    <div class="box">
      <div class="image-container">
        <img :src="product.picture" alt="Product Image" class="product-image" />
      </div>

      <div class="boxInfo">
        <div class="description">
          <h2>产品介绍</h2>
          <p>{{ product.description }}</p>
        </div>

        <div class="product-info">
          <p><strong>产品价格:</strong> {{ product.price }} 元</p>
          <p><strong>库存数量:</strong> {{ product.stock }} 件</p>
          <p><strong>关键字:</strong> {{ product.keywords.join(', ') }}</p>
          <p><strong>售卖情况:</strong> {{ product.available ? '在售' : '售罄' }}</p>
        </div>
      </div>
    </div>

    <div class="tail">
      <div class="buy" @click="product.value.available === true">添加到购物车</div>
      <!--设置事件跳转CheckoutModal.vue-->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import useUserInfoStore from '../stores/user';
import { storeToRefs } from 'pinia';

const userInfoStore = storeToRefs(useUserInfoStore())

const data = ref()

data.value = history.state




// 假设我们有一个土特产数据对象  
const product = ref({
  name: data.value.name,
  picture: "src/assets/picture/picture_package/productions/" + data.value.id + '.jpg',
  description: data.value.message,
  price: data.value.price, // 产品价格  
  stock: data.value.stock, // 库存数量  
  keywords: ["甜品", "地方特产", "手工制作"], // 关键字  
  available: true // 售卖情况  
});

console.log('history', product.value.description);

if (data.value.stock <= 0) {
  product.value.available = false
}

/**
 * 将商品提交到购物车（初始默认添加的商品数量为1）
 * 
 * 请求参数：
 * user_id:Int
 * product_id:Int
 * 
 * 响应参数：
 * 是否提交成功
 */
let postAddShopCart = async () => {

  if (product.value.available === true) {
    try {

      const url = "http://localhost:8081/"
      const response = await axios.post(url, {
        user_id: userInfoStore.user_id.value,
        product_id: data.value.product_id
      },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );


    } catch (error) {
      console.error("出错", error);
      alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }
  }
  else {
    alert('该商品已停售')
  }

}






// 创建时间和更新时间  
let createdAt = ref("2024-01-01");
let updatedAt = ref("2024-12-01");
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

.box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}



img{
  object-fit: contain;
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

.tail {
  width: 100%;
  height: 70px;
  margin-top: 20px;
  border-radius: 8px;
  background-color: #17a4ef;
}

.buy {
  width: 140px;
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

.buy:hover {
  background-color: #ae0707;
}
</style>