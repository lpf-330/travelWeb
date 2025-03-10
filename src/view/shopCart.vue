<script setup>

</script>

<template>
    <div class="contain">
        <el-container style="height: 100%;">
            <el-container class="body">
                <el-header class="header">
                    <div class="title">购物车</div>
                    <div class="sum">全部商品 ()</div>
                </el-header>
                <el-main class="main">
                    <el-scrollbar max-height="100%" class="scrollbar">

                    </el-scrollbar>
                </el-main>
            </el-container>
            <el-aside class="aside">Aside</el-aside>
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
    width: 70%;
}

.aside {
    height: 100%;
    width: 30%;
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
}

.scrollbar {
    width: 100%;
    background-color: beige;
}
</style>