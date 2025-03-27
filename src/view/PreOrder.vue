<script setup>
import { ref } from 'vue';
import useUserInfoStore from '../stores/user';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const userInfoStore = storeToRefs(useUserInfoStore())



/**
 * 获取历史订单
 * 
 * 请求参数：
 * user_id:String
 * 
 * 响应参数：
 * pre_orders:[{
 *  order_id:String,
 *  status:String,
 *  total_price:String,
 *  created_at:String,
 *  order_details:{
 *      productions:[{
 *          name:String,
 *          price:Number,
 *          quantity:Number
 *      },...],
 *      address:String
 *  }
 * },...]
 */
const fetchPreOrder = async () => {

    try {

        const url = "http://localhost:8081/"
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("响应获取历史订单", response.data);


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}

</script>

<template>
    <div class="containerBox">
        <el-scrollbar height="100%">
            <el-collapse>
                <el-collapse-item name="1">
                    <template #title>
                        <div class="titleBox">
                            <div class="titleBlock">
                                <span class="title">订单号：</span>
                            </div>
                            <div class="titleBlock">
                                <span class="title">订单状态：</span>
                            </div>
                            <div class="titleBlock">
                                <span class="title">金额：</span>
                            </div>
                            <div class="titleBlock">
                                <span class="title">创建时间</span>
                            </div>
                        </div>
                    </template>
                    <div class="orderDetails">
                        <div class="prodection">
                            <div class="productionBlock">
                                <span class="prodectionName">商品名称：</span>
                            </div>
                            <div class="productionBlock">
                                <span class="prodectionPrice">单价：</span>
                            </div>
                            <div class="productionBlock">
                                <span class="prodectionNum">数量：</span>
                            </div>
                        </div>
                        <div class="addBox">
                            <span>地址：</span>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-scrollbar>
    </div>
</template>

<style scoped>
.containerBox {
    width: 100%;
    height: 87%;
    box-sizing: border-box;
    padding-top: 3%;
    padding-bottom: 3%;
    padding-left: 3%;
    padding-right: 3%;
}

.title {
    font-size: 1.5rem;
    height: 3rem;
    line-height: 3rem;
}

.el-collapse {
    --el-collapse-header-height: 5rem;
}

.titleBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}

.titleBlock {
    height: 100%;
    width: 25%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 2%;
}

.prodection {
    width: 100%;
    height: 4rem;
    /* background-color: blueviolet; */
    box-sizing: border-box;
    padding: 0 2% 0 2%;
    display: flex;
    flex-direction: row;
}

.productionBlock {
    height: 100%;
    width: 33.333%;
    background-color: rgba(245, 245, 220, 0.217);
    border-style: dashed;
    border-color: cadetblue;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom-width: 0.1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.2rem;
    box-sizing: border-box;
    padding-left: 2%;
}

.addBox {
    width: 96%;
    background-color: rgba(245, 245, 220, 0.217);
    box-sizing: border-box;
    margin-left: 2%;
    margin-right: 2%;
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
    display: flex;
    justify-content: left;
}

.addBox span {
    font-size: 1.2rem;
    margin: 1.5%;
}
</style>