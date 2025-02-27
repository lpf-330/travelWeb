<script setup>

</script>

<template>
    <div class="box">
        <div class="contain">
            <input type="text" name="" id="">
        </div>
        <div class="contain">
            <input type="text" name="" id="">
        </div>
        <div class="contain">
            <input type="text" name="" id="">
        </div>
        <div class="contain">
            <input type="text" name="" id="">
        </div>
    </div>

</template>

<style scoped>
.box{
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 0;
    box-shadow: none;
}

.contain{
    height: 15%;
    width: 60%;
    background-color: aqua;
    margin-bottom: 4%;
    margin-left: 10%;
    border-radius: 10px;
}

.contain input{
    width: 100%;
    height: 100%;
    background-color: rgb(232, 240, 254);
    border-radius: 10px;
    border: 3px solid rgba(192, 192, 192, 0.406);
}
</style>