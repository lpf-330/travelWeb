<script setup>
import { Delete } from '@element-plus/icons-vue'
</script>

<template>
    <div class="item">
        <div class="contain">
            <div class="selectBox">
                <input type="checkbox" name="" id="">
            </div>
            <div class="imgBox"></div>
            <div class="nameBox">
                <div class="name">
                    <span>{{}}</span>
                </div>
                <div class="unitPrice">
                    <span>单价：{{}} 元</span>
                </div>
            </div>
            <div class="numBox">
                <div class="num">
                    <button class="button"> - </button>
                    <div class="showNum">
                        <span>{{ }}</span>
                    </div>
                    <button class="button"> + </button>
                </div>
                <el-button type="danger" :icon="Delete" circle />
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