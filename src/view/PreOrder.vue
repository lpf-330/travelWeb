<script setup>
import { ref } from 'vue';
import useUserInfoStore from '../stores/user';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const userInfoStore = storeToRefs(useUserInfoStore())



const orders = ref([])
const order_details = ref([])

/**
 * 返回所有用户的历史订单
 * 
 * 请求参数：
 * user_id:Int
 * 
 * 响应参数：
 * orders:[{
 *  order_id,
 *  status,
 *  total_price,
 *  created_at,
 *  user_id,
 *  address
 * },...]
 */
const fetchUserOrder = async () => {

    try {
        const url = "http://localhost:8081/fetchUserOrder"    //后端还没写
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('所有用户的历史订单', response.data);
        orders.value = response.data

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }
}

fetchUserOrder()


/**
 * 请求参数：
 * order_id:Int
 * 
 * 响应参数：
 * order_details:[{
 *  name,
 *  price,
 *  quantity
 * },...],
 */
const fetchOrderDetails = async (order_id) => {
    console.log('fetchOrderDetails');

    try {
        const url = "http://localhost:8081/fetchOrderDetails"    //后端还没写
        const response = await axios.post(url, {
            order_id: order_id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        order_details.value = response.data


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}

</script>

<template>
    <div class="containerBox">
        <el-scrollbar height="100%">
            <el-collapse accordion>
                <el-collapse-item :name="item.order_id" v-for="item in orders" v-bind:key="item.order_id"
                    @click="fetchOrderDetails(item.order_id)">
                    <template #title>
                        <div class="titleBox">
                            <div class="titleBlock">
                                <span class="title">订单号：{{ item.order_id }}</span>
                            </div>
                            <div class="titleBlock">
                                <span class="title">订单状态：{{ item.status }}</span>
                            </div>
                            <div class="titleBlock">
                                <span class="title">金额：{{ item.total_price }}</span>
                            </div>
                            <div class="titleBlock">
                                <span class="title">创建时间{{ ' ' + item.create_at }}</span>
                            </div>
                        </div>
                    </template>
                    <div>
                        <div class="prodection" v-for="value in order_details">
                            <div class="productionBlock">
                                <span>商品名称：{{ value.name }}</span>
                            </div>
                            <div class="productionBlock">
                                <span>单价：{{ value.price }}</span>
                            </div>
                            <div class="productionBlock">
                                <span>数量：{{ value.quantity }}</span>
                            </div>
                        </div>
                        <div class="addBox">
                            <span>地址：{{ item.address }}</span>
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