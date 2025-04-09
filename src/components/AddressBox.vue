<script setup>
import { Delete } from '@element-plus/icons-vue'
import { ref } from 'vue';
import useUserInfoStore from '../stores/user';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const userInfoStore = storeToRefs(useUserInfoStore())

console.log('userInfoStore', userInfoStore.address.value);


const radio = ref(userInfoStore.nowAddr.value)
const address = ref(userInfoStore.address.value)

console.log('radio', radio.value);
console.log('userInfoStore', userInfoStore);


/**
 * 更新当前使用的地址
 * 
 * 请求参数：
 * user_id:String,
 * add_id:String
 * 
 * 响应参数：
 * 是否更新成功
 */
const updateNowAddress = async (addr_id) => {

    try {

        const url = "http://localhost:8081/updateNowAddress"
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
            addr_id: addr_id,
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("响应更新当前地址", response.data);


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}

/**
 * 更新地址内容
 * 
 * 请求参数：
 * user_id:String,
 * addr_id:String,
 * address:String
 * 
 * 响应参数：
 * 是否更新成功
 */
const updateAddress = async (value) => {

    try {

        const url = "http://localhost:8081/updateAddress"
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
            addr_id: addr_id,
            address: value
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("响应更新地址", response.data);


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}

/**
 * 删除地址
 * 
 * 请求参数：
 * user_id:String,
 * addr_id:String
 * 
 * 响应参数：
 * 是否删除成功
 */
const deleteAddress = async (addr_id) => {

    try {

        const url = "http://localhost:8081/deleteAddress"
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
            addr_id: addr_id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("响应删除地址", response.data);


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}

/**
 * 增加地址
 * 
 * 请求参数：
 * user_id:String,
 * address:String
 * 
 * 响应参数：
 * addr_id  (后端分配好addr_id后，将addr_id返回)
 */
const addAddress = async (value) => {

    try {

        const url = "http://localhost:8081/addAddress"
        const response = await axios.post(url, {
            user_id: userInfoStore.user_id.value,
            address: value
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("响应删除地址", response.data);


    } catch (error) {
        console.error("出错", error);
        alert("加载失败，请稍后再试。"); // 友好的错误提示  

    }

}
</script>


<template>
    <div class="box">
        <el-scrollbar class="scrollbar" height="100%">
            <el-radio-group style="width: 100%;height: 100%;" v-model="radio">
                <div class="contain" v-for="(value, index) in address" v-bind:key="value.addr_id">
                    <div class="selectBox">
                        <div class="selectButton">
                            <el-radio size="large" :value="value.addr_id"></el-radio>
                        </div>
                        <div class="selectShow">
                            <span v-if="radio === value.addr_id">当前使用的地址</span>
                        </div>
                    </div>
                    <div class="addressBox">
                        <input class="address" type="text" name="" id="" v-model="value.address">
                    </div>
                    <div class="updataBox">
                        <el-button type="success">修改</el-button>
                    </div>
                    <div class="deleteBox">
                        <el-button type="danger" :icon="Delete" circle />
                    </div>
                </div>

            </el-radio-group>



            <div class="addBox">
                <el-button class="addButton" type="success" circle>+</el-button>
            </div>
        </el-scrollbar>
    </div>

</template>

<style scoped>
.box {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 0;
    box-shadow: none;
}

.scrollbar {
    width: 100%;
}

.contain {
    height: 5rem;
    width: 100%;
    margin-bottom: 3%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #f4f4f4;
}

.address {
    width: 100%;
    height: 100%;
    background-color: rgb(232, 240, 254);
    border-radius: 10px;
    border: 3px solid rgba(192, 192, 192, 0.406);
    box-sizing: border-box;
}

.addBox {
    height: 5rem;
    width: 100%;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}

.selectBox {
    height: 100%;
    width: 25%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.addressBox {
    height: 100%;
    width: 45%;
}

.updataBox {
    height: 100%;
    width: 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.deleteBox {
    height: 100%;
    width: 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.addButton {
    font-size: 3rem;
    height: 4rem;
    width: 4rem;
}

.selectButton {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.selectShow {
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: left;
}

.selectShow span {
    font-size: 1rem;
}
</style>