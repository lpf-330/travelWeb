<script setup>
import { defineProps } from 'vue';
import router from '../router';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import useProductionsStore from '../stores/productions';


// onMounted(()=>{
//     document.querySelector('.name').style.
// })

let props = defineProps({
    id: {
        type: String,
        // required: true
    },
    toLink: {
        type: String,
        // required: true, // 这是一个必需的属性  
    },
});

let fetchProduct = async () => {

    try {

        const url = "http://localhost:8081/"    //这里后端还没写
        const response = await axios.post(url, {

        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("响应登录", response.data);

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}


const toProductDetails = () => {
    router.push("/index/" + props.toLink)
}



</script>


<template>
    <div class="box" @click="toProductDetails">
        <div class="img"></div>
        <div class="name">{{ }}</div>
        <div class="price">{{ }}</div>
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

.box:hover {
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

.name {
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

.price {
    width: 90%;
    margin: auto;
    height: 15%;
    color: tomato;
    font-size: 1.6rem;
    text-align: left;
}
</style>