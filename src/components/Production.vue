<script setup>
import { defineProps } from 'vue';
import router from '../router';
import useProductionsStore from '../stores/productions';
import { storeToRefs } from 'pinia';

let productionStore=storeToRefs(useProductionsStore())

let props = defineProps({
  production: {
    type: Object,
    required: true
  },
  toLink: {
    type: String,
    required: true, // 这是一个必需的属性  
  },
});



const toProductDetails=()=>{
    
    productionStore.production.value=props.production 
    console.log("1",productionStore.production.value);
    
    router.push("/index/"+props.toLink)
}



</script>


<template>
    <div class="box" @click="toProductDetails">
        <img class="img" :src="'src/assets/picture/production/'+props.production.product_id+'.jpg'"></img>
        <div class="name">{{ props.production.name }}</div>
        <div class="price">{{ props.production.price }}</div>
    </div>

</template>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    background-color: rgb(241, 241, 241);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.348);
    border-radius: 15px;
    box-sizing: border-box;
    cursor: pointer;
}

.box:hover{
    border: 2px orange solid;
}

.img {
    width: 95%;
    height: 65%;
    margin-top: 2%;
    margin-left: auto;
    margin-right: auto;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}

.name{
    width: 90%;
    margin: auto;
    height: 17%;
    font-size: 1.1rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: break-word;
    text-align: left;
}

.price{
    width: 90%;
    margin: auto;
    height: 15%;
    color: tomato;
    font-size: 1.6rem;
    text-align: left;
}



</style>