<template>
    <div class="container">
        <h1>订单列表</h1>
        <div class="scrollbarBox" id="scenery-list">
            <el-scrollbar>
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
                        <div>
                            <div class="prodection">
                                <div class="productionBlock">
                                    <span>商品名称：</span>
                                </div>
                                <div class="productionBlock">
                                    <span>单价：</span>
                                </div>
                                <div class="productionBlock">
                                    <span class="prodectionNum">数量：</span>
                                </div>
                            </div>
                            <div class="addBox">
                                <span>用户：</span>
                                <span>地址：</span>
                                <div class="handle">
                                    <el-button type="danger">撤回</el-button>
                                    <el-button type="success">通过</el-button>
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
import AdmMain from '../components/AdmMain.vue';


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