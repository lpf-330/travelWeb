<script setup>
import { ElContainer } from 'element-plus';
import ShopCartItem from '../components/ShopCartItem.vue';
import { ref } from 'vue';
import useUserInfoStore from '../stores/user';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const userInfoStore = storeToRefs(useUserInfoStore())

const selected = ref([])    //在shopCart的下标
const shopCart = ref([])
const sumPrice = ref(0)


/**
 * 获取用户购物车的所有商品
 * 
 * 请求参数：
 * user_id:String，
 * 
 * 响应参数：
 * product_id，
 * quantity，
 * name，
 * price,
 * image
 */
const fetchShopCart = async () => {

    try {
        const url = "http://localhost:8081/product/fetchShopCart"    //后端还没写
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );



        for (let i = 0; i < response.data.length; i++) {
            shopCart.value.push({
                product_id: response.data[i].product_id,
                quantity: response.data[i].quantity,
                name: response.data[i].name,
                price: response.data[i].price,
                // image: response.data[i].image
            })

        }

        console.log('购物车所有商品', shopCart.value);


        // countSumPrice()

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}

fetchShopCart()


/**
 * 购物车某商品的数量加1
 * 
 * 请求参数：
 * user_id:String，
 * product_id:String
 * 
 * 响应参数：
 * 是否添加成功
 */
const addQuantity = async ({ product_id }) => {

    try {
        const url = "http://localhost:8081/product/addQuantity"    //后端还没写
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
            product_id: product_id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data === 1) {
            for (let i = 0; i < shopCart.value.length; i++) {
                if (shopCart.value[i].product_id === product_id) {
                    shopCart.value[i].quantity++
                    break
                }
            }
        }

        countSumPrice()

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  
    }
}


/**
 * 购物车某商品的数量减1
 * reduceQuantity
 * 请求参数：
 * user_id:String，
 * product_id:String
 * 
 * 响应参数：
 * 是否减少成功
 */
const reduceQuantity = async ({ product_id }) => {

    try {
        const url = "http://localhost:8081/product/reduceQuantity"    //后端还没写
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
            product_id: product_id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data === 1) {
            for (let i = 0; i < shopCart.value.length; i++) {
                if (shopCart.value[i].product_id === product_id) {
                    shopCart.value[i].quantity--
                    break
                }
            }
        }

        countSumPrice()

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  
    }
}

/**
 * 删除购物车某商品
 * deleteProduction
 * 响应参数：
 * user_id:String，
 * product_id:String
 * 
 * 响应参数：
 * 是否删除成功
 */
const deleteProduction = async ({ product_id }) => {

    try {
        const url = "http://localhost:8081/product/deleteProduction"    //后端还没写
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
            product_id: product_id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (response.data === 1) {
            console.log('删除前', shopCart.value);

            for (let i = 0; i < shopCart.value.length; i++) {
                if (shopCart.value[i].product_id === product_id) {
                    selected.value.splice(selected.value.indexOf(i), 1)
                    shopCart.value.splice(i, 1)
                    break
                }
            }

            countSumPrice()
            console.log('删除后', shopCart.value);

            alert('删除成功')
        } else {
            alert('删除失败')
        }


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  
    }
}

/**
 * 用户结算账单
 * 
 * 请求参数：
 * user_id:String,
 * total_price:Number,
 * address:String,
 * order_details:[{
 *  product_id:String,
 *  quantity:Number,
 *  price:Number
 * },...]
 * 
 * 响应参数：
 * 是否提交结算成功
 */
const postCheckOut = async () => {
    const order_details = []
    for (let i = 0; i < selected.value.length; i++) {
        order_details.push({
            product_id: shopCart.value[selected.value[i]].product_id,
            quantity: shopCart.value[selected.value[i]].quantity,
            price: shopCart.value[selected.value[i]].price
        })
    }

    try {
        const url = "http://localhost:8081/"    //后端还没写
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
            total_price: sumPrice.value,
            address: userInfoStore.nowAddr.value,
            order_details: order_details
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  
    }
}

const select = ({ index }) => {
    console.log('选择前', selected.value);

    try {
        let isExist = false
        for (let i = 0; i < selected.value.length; i++) {
            if (selected.value[i] === index) {
                isExist = true
                break
            }
        }

        if (isExist === false) {
            selected.value.push(index)
        } else {
            selected.value.splice(selected.value.indexOf(index), 1)
        }
    } catch (e) {
        console.log('e', e);
    }

    console.log('选择后', selected.value);
    countSumPrice()
}

const countSumPrice = () => {
    sumPrice.value = 0
    for (let i = 0; i < selected.value.length; i++) {
        sumPrice.value += shopCart.value[selected.value[i]].quantity * shopCart.value[selected.value[i]].price
    }
}




</script>


<template>
    <div class="contain">
        <el-container style="height: 100%;">
            <el-container class="body">
                <el-header class="header">
                    <div class="title">购物车</div>
                    <div class="sum">全部商品 ({{ shopCart.length }})</div>
                </el-header>
                <el-main class="main">
                    <el-scrollbar max-height="100%" class="scrollbar">
                        <shop-cart-item v-for="(value, index) in shopCart" :key="value.product_id" :data="value"
                            :index="index" @addQuantity="addQuantity" @reduceQuantity="reduceQuantity"
                            @deleteProduction="deleteProduction" @select="select">
                        </shop-cart-item>
                    </el-scrollbar>
                </el-main>
            </el-container>
            <el-aside class="aside">
                <div class="asideContain">
                    <div class="view">
                        <div class="viewHead">
                            <div class="selectHeadImg">
                                <span>商品</span>
                            </div>
                            <div class="selectHeadNum">
                                <span>数量</span>
                            </div>
                            <div class="selectHeadPrice">
                                <span>价格</span>
                            </div>
                        </div>
                        <div class="scrollbarBox">
                            <el-scrollbar max-height="100%" style="width: 100%;">
                                <div class="selectItem" v-for="i in selected" :key="shopCart[i].product_id">
                                    <div class="selectImg"></div>
                                    <div class="selectNum">
                                        <span>{{ shopCart[i].quantity }}</span>
                                    </div>
                                    <div class="selectPrice">
                                        <span>{{ shopCart[i].quantity * shopCart[i].price }} 元</span>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                        <div class="selectSum">
                            <div class="sumBox">
                                <div class="sumNum">已选择 {{ selected.length }} 件商品</div>
                                <div class="sumPrice">总价：{{ sumPrice }} 元</div>
                            </div>
                            <div class="checkBox">
                                <button class="checkButton">结算</button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-aside>
        </el-container>
    </div>
</template>

<style scoped>
.contain {
    width: 100%;
    height: 89.25%;
}

.body {
    height: 100%;
}

.header {
    height: 10%;
    padding-left: 10%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.title {
    font-size: 1.8rem;
    font-weight: 600;
}

.main {
    padding-left: 10%;
    padding-bottom: 4%;
}

.scrollbar {
    width: 100%;
    background-color: #f1f1f1;
    border-radius: 1rem;
}

.aside {
    height: 100%;
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: right;
    padding-right: 6.5%;
}

.asideContain {
    height: 60%;
    width: 80%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.37);
    border-radius: 1rem;
    box-sizing: border-box;
    padding: 4%;
}

.view {
    width: 100%;
    height: 100%;
}

.selectSum {
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.scrollbarBox {
    height: 70%;
    width: 100%;
}

.viewHead {
    width: 100%;
    height: 10%;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: row;
}

.sumBox {
    height: 100%;
    width: 60%;
}

.sumNum {
    height: 50%;
    width: 100%;
    font-size: 1rem;
    box-sizing: border-box;
    padding-left: 15%;
    display: flex;
    align-items: center;
}

.sumPrice {
    height: 50%;
    width: 100%;
    font-size: 1.2rem;
    box-sizing: border-box;
    padding-left: 15%;
    display: flex;
    align-items: center;
    color: red;
}

.checkBox {
    height: 100%;
    width: 40%;
    box-sizing: border-box;
    padding: 6% 8% 6% 8%;
}

.checkButton {
    height: 100%;
    width: 100%;
    background-color: red;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 0.4rem;
}

.selectItem {
    width: 100%;
    height: 5rem;
    margin-bottom: 4%;
    display: flex;
    flex-direction: row;
}

.selectHeadImg,
.selectHeadNum,
.selectHeadPrice,
.selectImg,
.selectNum,
.selectPrice {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.selectHeadImg {
    width: 30%;
}

.selectHeadNum {
    width: 35%;
}

.selectHeadPrice {
    width: 35%;
}

.selectImg,
.selectNum,
.selectPrice {
    height: 5rem;
    border-style: solid;
    border-color: #dfdfdf;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom-width: 0.2rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.selectImg {
    width: 30%;
    padding: 2%;
}

.selectNum {
    width: 35%;
}

.selectPrice {
    width: 35%;
}
</style>