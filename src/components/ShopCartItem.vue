<script setup>
import { Delete } from '@element-plus/icons-vue'
import { defineProps } from 'vue';
import { ref } from 'vue';
import { defineEmits } from 'vue';

let props = defineProps({
    data: {
        type: Object,
    },
    index: {
        type: Number
    }
});



const data = ref(props.data)

const emit = defineEmits(['addQuantity', 'reduceQuantity', 'deleteProduction', 'select'])

const addQuantity = () => {
    emit('addQuantity', { product_id: props.data.product_id })
}

const reduceQuantity = () => {
    if (data.value.quantity > 1) {
        emit('reduceQuantity', { product_id: props.data.product_id })
    }
}

const deleteProduction = () => {
    emit('deleteProduction', { product_id: props.data.product_id })
}

const select = () => {
    // console.log('index', props.index);

    console.log('emit', typeof (emit));

    emit('select', { index: props.index })
}

</script>

<template>
    <div class="item">
        <div class="contain">
            <div class="selectBox">
                <input type="checkbox" name="" id="" @click="select">
            </div>
            <div class="imgBox"></div>
            <div class="nameBox">
                <div class="name">
                    <span>{{ data.name }}</span>
                </div>
                <div class="unitPrice">
                    <span>单价：{{ data.price }} 元</span>
                </div>
            </div>
            <div class="numBox">
                <div class="num">
                    <button class="button" @click="reduceQuantity"> - </button>
                    <div class="showNum">
                        <span>{{ data.quantity }}</span>
                    </div>
                    <button class="button" @click="addQuantity"> + </button>
                </div>
                <el-button type="danger" :icon="Delete" circle @click="deleteProduction" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.item {
    height: 10rem;
    width: 100%;
    border-style: solid;
    border-color: #ccc;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom-width: 0.1rem;
    padding: 1%;
    box-sizing: border-box;
}

.contain {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.selectBox {
    height: 100%;
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.imgBox {
    height: 100%;
    width: 20%;
    padding: 1%;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

.nameBox {
    height: 100%;
    width: 50%;
    box-sizing: border-box;
    padding: 2%;
    display: flex;
    flex-direction: row;
}

.numBox {
    height: 100%;
    width: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

input[type="checkbox"] {
    accent-color: aqua;
    /* 勾选后的背景颜色 */
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    cursor: pointer;
}

/* 如果想进一步自定义，可以增加以下样式 */
input[type="checkbox"]:checked {
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: aqua;
}


.num {
    height: 30%;
    width: 60%;
    background-color: cadetblue;
    display: flex;
    flex-direction: row;
}

.button {
    width: 30%;
    font-size: 1.8rem;
    cursor: pointer;
}

.showNum {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.name {
    height: 100%;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: left;
}

.name {
    font-size: 1.2rem;
}

.unitPrice {
    height: 100%;
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.unitPrice span {
    font-size: 1rem;
}
</style>