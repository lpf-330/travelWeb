<template>
    <div class="container">
        <h1>订单列表</h1>
        <div class="scrollbarBox" id="scenery-list">
            <el-scrollbar>
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
                                    <span class="title">创建时间{{ ' ' + item.created_at }}</span>
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
                                    <span class="prodectionNum">数量：{{ value.quantity }}</span>
                                </div>
                            </div>
                            <div class="addBox">
                                <span>用户id：{{ item.user_id }}</span>
                                <span>地址：{{ item.address }}</span>
                                <div class="handle">
                                    <el-button type="danger" @click="passOrder(item.order_id,0)">撤回</el-button>
                                    <el-button type="success" @click="passOrder(item.order_id,1)">通过</el-button>
                                </div>
                            </div>

                        </div>
                    </el-collapse-item>


                </el-collapse>
            </el-scrollbar>
        </div>
    </div>

</template>


<script setup>
import { onMounted } from 'vue';
import axios from 'axios';
import { ref } from 'vue';


const orders = ref([])
const order_details = ref([])

/**
 * 返回所有要审核的订单
 * 
 * 请求参数：
 * 无
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
const fetchOrder = async () => {

    try {
        const url = "http://localhost:8081/fetchOrder"    //后端还没写
        const response = await axios.post(url, {

        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('所有待审核订单', response.data);
        orders.value = response.data

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }
}

fetchOrder()


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



/**
 * 审核通过订单
 * 
 * 响应参数：
 * order_id：Int
 * 
 * 返回参数：
 * 是否修改成功
 */
const passOrder = async (order_id,isPass) => {

    try {
        const url = "http://localhost:8081/passOrder"    //后端还没写
        const response = await axios.post(url, {
            order_id: order_id,
            isPass: isPass
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('通过订单', response.data);

        fetchOrder()

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}


/**
 * 审核拒绝订单
 * 
 * 响应参数：
 * order_id：Int
 * 
 * 返回参数：
 * 是否拒绝成功
 */
const rejectedOrder = async (index) => {

    try {
        const url = "http://localhost:8081/"    //后端还没写
        const response = await axios.post(url, {
            order_id: orders.value[index].order_id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log('通过订单', response.data);

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}

</script>


<style scoped>
.container {
    height: 93.6%;
    margin: auto;
    padding-top: 2%;
    padding-bottom: 2%;
    padding-left: 5%;
    padding-right: 5%;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
}

.scrollbarBox {
    height: 90%;
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

.title {
    font-size: 1.5rem;
    height: 3rem;
    line-height: 3rem;
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
    flex-direction: column;
}

.addBox span {
    font-size: 1.2rem;
    margin: 1.5%;
}

.handle {
    width: 100%;
    height: 4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.handle button {
    height: 80%;
    width: 6rem;
    font-size: 1.2rem;
    margin-left: 5%;
    margin-right: 5%;
}

.el-collapse {
    --el-collapse-header-height: 5rem;
}
</style>