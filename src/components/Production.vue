<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
// import router from '../router';

const router = useRouter()

let props = defineProps({
    data: {
        type: Object,
    },
    toLink: {
        type: String,
    },
});

const toProductDetails = () => {
    router.push({
        name: props.toLink,
        state: props.data
    })
}



</script>


<template>
    <div class="box" @click="toProductDetails">
        <img class="img" :src="'src/assets/picture/picture_package/productions/' + props.data.id + '.jpg'"></img>
        <div class="name">{{ props.data.name }}</div>
        <div class="price">{{ props.data.price }}</div>
    </div>

</template>

<style scoped>
.box {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    box-sizing: border-box;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.224);
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