<script setup>
import { defineProps } from 'vue';
import router from '../router';

// onMounted(()=>{
//     document.querySelector('.name').style.
// })

let props = defineProps({
  id: {
    type: String,
    required: true
  },
  toLink: {
    type: String,
    required: true, // 这是一个必需的属性  
  },
});


const toProductDetails=()=>{
    router.push("/index/"+props.toLink)
}



</script>


<template>
    <div class="box" @click="toProductDetails">
        <div class="img"></div>
        <div class="name">{{  }}</div>
        <div class="price">{{  }}</div>
    </div>

</template>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    background-color: aqua;
    border-radius: 15px;
    box-sizing: border-box;
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