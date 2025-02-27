<script setup>

</script>

<template>
    <div class="spaceBox">
        <div class="harfBox">
            <div class="box img">
            </div>
            <div class="box name">
                <span>昵称</span>
                <input type="text" class="read" readonly>
            </div>  
            <div class="box email">
                <span>邮箱</span>
                <input type="email" class="read" readonly>
            </div>
            <div class="box phone">
                <span>电话</span>
                <input type="text" class="read" readonly>
            </div>
        </div>
        <div class="harfBox">
            <div class="box img"></div>
            <div class="box name">
                <input type="text" class="update">
                <button class="updateButton">修改</button>
            </div>  
            <div class="box email">
                <input type="email" class="update">
                <button class="updateButton">修改</button>
            </div>
            <div class="box phone">
                <input type="text" class="update">
                <button class="updateButton">修改</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.spaceBox{
    height: 90%;
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction:row;
}

.harfBox{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 10%;
    box-sizing: border-box;
}

.box{
    height: 12%;
    width: 70%;
    margin-bottom: 5%;
    margin-top: 2%;
    border-radius: 5px;
    border: 4px solid rgba(112, 128, 144, 0.26);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-right: 10%;
    box-sizing: border-box;
}

.img{
    height: 150px;
    width: 150px;
    background-color: silver;
}

.box input{
    height: 35%;
    width: 70%;
    border-radius: 5px;
    border: 1px solid black;
}

.read{
    background-color: rgba(192, 192, 192, 0.779);
}

.box span{
    margin-left: 5%;
    font-size: 1.2rem;
}

.updateButton{
    height: 50px;
    width: 70px;
    background-color: aqua;
    border-radius: 10px;
}

.update{
    margin-left: 10%;
    margin-right: 8%;
}
</style>