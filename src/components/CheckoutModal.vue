<template>  
    <div class="modal-overlay" v-if="isVisible">  
      <div class="modal">  
        <h2>确认订单信息</h2>  
        <p>订单ID: {{ orderId }}</p>  
        
        <div class="product-list">  
          <h3>已选产品:</h3>  
          <ul>  
            <li v-for="product in selectedProducts" :key="product.name">  
              {{ product.name }} - {{ product.price }} 元  
            </li>  
          </ul>  
        </div>  
        
        <div class="order-summary">  
          <p>单品总价: {{ totalPrice }} 元</p>  
          <div class="quantity-control">  
            <label for="quantity">购买数量:&nbsp;&nbsp;</label>  
            <input   
              type="number"   
              v-model.number="quantity"   
              min="1"   
              :max="maxQuantity"  
            />  
          </div>  
          <p>订单总价: {{ totalOrderPrice }} 元</p>  
        </div>  
        
        <div class="address-input">  
          <label for="address">收货地址:&nbsp;&nbsp;</label>  
          <input   
            type="text"   
            v-model="address"   
            placeholder="请输入详细收货地址"  
          />  
        </div>  
        
        <div class="modal-actions">  
          <button @click="submitOrder" class="submit-btn">提交订单</button>  
          <button @click="close" class="cancel-btn">取消</button>  
        </div>  
      </div>  
    </div>  
  </template>  
  
  <script setup>  
  import { ref, computed } from 'vue';  
  
  let props = defineProps({  
    isVisible: { type: Boolean, required: true },  
    selectedProducts: { type: Array, required: true },  
    totalPrice: { type: Number, required: true }  
  });  
  
  let emit = defineEmits(['close', 'submit']);  
  
  let quantity = ref(1);  
  let address = ref('');  
  let orderId = generateOrderId();  
  
  // 最大可购买数量（假设默认为99）  
  let maxQuantity = ref(99);  
  
  // 计算订单总价  
  let totalOrderPrice = computed(() => {  
    return props.totalPrice * quantity.value;  
  });  
  
  function generateOrderId() {  
    return `O-${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;  
  }  
  
  function submitOrder() {  
    // 表单验证  
    if (!address.value.trim()) {  
      alert("请填写完整的收货地址");  
      return;  
    }  
    
    if (quantity.value < 1) {  
      alert("购买数量必须大于0");  
      return;  
    }  
  
    let orderData = {  
      orderId,  
      products: props.selectedProducts,  
      quantity: quantity.value,  
      address: address.value,  
      totalPrice: totalOrderPrice.value  
    };  
  
    emit('submit', orderData);  
    close();  
  }  
  
  function close() {  
    emit('close');  
  }  
  </script>  
  
  <style scoped>   
  ul{
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-weight: bold;
  }

  .modal-overlay {  
    position: fixed;  
    top: 0;  
    left: 0;  
    right: 0;  
    bottom: 0;  
    background: rgba(0, 0, 0, 0.7);  
    display: flex;  
    justify-content: center;  
    align-items: center;  
  }  
  
  .modal {  
    background: white;  
    padding: 20px;  
    border-radius: 8px;  
    width: 300px;  
  }  
  
  .modal-actions {  
    margin-top: 20px;  
    display: flex;  
    justify-content: space-between;  
  }  

  .modal {  
    max-width: 400px;  
    width: 90%;  
  }  
  
  .submit-btn {  
    background-color: #4CAF50;  
    color: white;
    border-radius: 8px;
    margin-left: 50px;  
  }  
  
  .cancel-btn {  
    background-color: #f44336;  
    color: white;
    border-radius: 8px;
    margin-right: 50px;  
  }  
  </style>