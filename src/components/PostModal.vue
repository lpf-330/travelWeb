<template>  
    <div class="modal-overlay" @click.self="close">  
      <div class="modal">  
        <div class="modal-header">  
          <span class="modal-title">{{ title }}</span>  
          <button class="close" @click="close">&times;</button>  
        </div>  
        <div class="modal-body">  
          <slot></slot>  
        </div>  
        <div class="modal-footer">  
          <button class="cancel-button" @click="close">取消</button>  
          <button class="submit-button" @click="onSubmit">提交</button>  
        </div>  
      </div>  
    </div>  
  </template>  
  
  <script setup>  
  import { defineProps } from 'vue'; 
  import { defineEmits } from 'vue';  

  let emit=defineEmits();
  
  // 定义 props  
  let props = defineProps({  
    title: {  
      type: String,  
      default: '模态框标题',  
    },  
    onSubmit: {  
      type: Function,  
      required: true  
    }  
  });  
  
  // 关闭模态框的方法  
  let close = () => {  
    emit('close'); // 触发关闭事件  
  };  
  </script>  
  
  <style scoped>  
  .modal-overlay {  
    position: fixed;  
    top: 0;  
    left: 0;  
    right: 0;  
    bottom: 0;  
    background-color: rgba(0, 0, 0, 0.7);  
    display: flex;  
    justify-content: center;  
    align-items: center;  
    z-index: 1000;  
  }  
  
  .modal {  
    background-color: white;  
    border-radius: 8px;  
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);  
    width: 100%; /* 默认宽度为 100% */  
    max-width: 500px; /* 设置最大宽度 */  
    padding: 20px;  
    display: flex;  
    flex-direction: column;  
  }  
  
  .modal-header {  
    display: flex;  
    justify-content: space-between;  
    align-items: center;  
  }  
  
  .modal-title {  
    font-size: 1.5em;  
  }  
  
  .close {  
    background: none;  
    border: none;  
    font-size: 1.5em;  
    cursor: pointer;  
  }  
  
  .modal-body {  
    margin-top: 10px;  
    display: flex;  
    flex-direction: column; /* 垂直排列 */  
    gap: 10px; /* 输入框之间的间距 */  
  }  
  
  .modal-footer {  
    display: flex;  
    justify-content: center; /* 中间对齐 */  
    gap: 10px;  
    margin-top: 20px; /* 提高底部间距 */  
  }  
  
  .cancel-button,  
  .submit-button {  
    padding: 10px 15px;  
    border: none;  
    border-radius: 4px;  
    cursor: pointer;  
    text-align: center;  
  }  
  
  .cancel-button {  
    background-color: #f44336;  
    color: white;  
  }  
  
  .submit-button {  
    background-color: #4CAF50;  
    color: white;  
  }  
  </style>