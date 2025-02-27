
<template>
  <div class="container">
        <div class="total">
        <AdmMain></AdmMain>  
        </div>
        <h1>名人名事列表</h1>
        <div id="scenery-list">
            <div class="scenery-item">
                <div class="image-placeholder">
                    <span class="number-label">1</span>
                </div>
                <div class="scenery-description">
                    <h2>名人名事 1</h2>
                    <p>这是第一个景点的描述，介绍该景点的特点和历史。</p>
                    <p></p>
                </div>
                <div class="button-group">
                    <button class="modify-button">修改</button>
                    <button class="delete-button">删除</button>
                </div>
            </div>
            <div class="scenery-item">
                <div class="image-placeholder">
                    <span class="number-label">2</span>
                </div>
                <div class="scenery-description">
                    <h2>名人名事 2</h2>
                    <p>这是第二个景点的描述，介绍它的魅力和吸引点。</p>
                </div>
                <div class="button-group">
                    <button class="modify-button">修改</button>
                    <button class="delete-button">删除</button>
                </div>
            </div>
            <div class="scenery-item">
                <div class="image-placeholder">
                    <span class="number-label">3</span>
                </div>
                <div class="scenery-description">
                    <h2>名人名事 3</h2>
                    <p>第三个景点的介绍，包括它的特色之处和游玩的建议。</p>
                </div>
                <div class="button-group">
                    <button class="modify-button">修改</button>
                    <button class="delete-button">删除</button>
                </div>
            </div>
        </div>
        <button id="add-button">增加</button>
    </div>
</template>


<script setup>
import AdmMain from '../components/AdmMain.vue';
import { onMounted } from 'vue';

onMounted(()=>{
    document.getElementById('add-button').addEventListener('click', function () {
    const sceneryList = document.getElementById('scenery-list');

    const newScenery = document.createElement('div');
    newScenery.className = 'scenery-item';

    newScenery.innerHTML = `  
        <div class="image-placeholder">200 x 200</div>  
        <div class="scenery-description">  
            <h2>新名人</h2>  
            <p>这是新景点的描述，可以添加更多信息。</p>  
        </div>  
        <div class="button-group">  
            <button class="modify-button">修改</button>  
            <button class="delete-button">删除</button>  
        </div>  
    `;

    sceneryList.appendChild(newScenery);

    // 为删除按钮添加事件  
    newScenery.querySelector('.delete-button').addEventListener('click', function () {
        sceneryList.removeChild(newScenery);
    });

    // 为修改按钮添加事件  
    newScenery.querySelector('.modify-button').addEventListener('click', function () {
        alert('修改功能待实现！');
    });
});

// 为现有的删除按钮添加事件  
document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function () {
        const item = button.closest('.scenery-item');
        sceneryList.removeChild(item);
    });
});

// 为现有的修改按钮添加事件  
document.querySelectorAll('.modify-button').forEach(button => {
    button.addEventListener('click', function () {
        alert('修改功能待实现！');
    });
});
})
</script>


<style scoped>


body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 100%;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
}

.scenery-item {
    display: flex;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    background-color: #fafafa;
    position: relative;
    /* 让子元素相对于此盒子定位 */
}

.image-placeholder {
    width: 200px;
    height: 200px;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    position: relative;
    /* 让数字标记相对于此盒子定位 */
}

.number-label {
    font-size: 3em;
    /* 数字标的字体大小 */
    color: white;
    /* 数字标的颜色 */
    position: absolute;
    /* 绝对定位 */
    top: 15%;
    /* 调整数字的位置 */
    left: 15%;
    /* 调整数字的位置 */
    transition: transform 0.3s;
    /* 平滑过渡效果 */
    opacity: 0.8;
    /* 数字的透明度 */
}

.scenery-item:hover .number-label {
    transform: scale(1.2);
    /* 悬浮时放大效果 */
}

.scenery-description {
    flex: 1;
}

.button-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

button {
    margin-top: 5px;
    margin-left: 5px;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
}

.modify-button {
    background-color: #007bff;
}

.modify-button:hover {
    background-color: #0056b3;
}

.delete-button {
    background-color: #dc3545;
}

.delete-button:hover {
    background-color: #c82333;
}

#add-button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}

#add-button:hover {
    background-color: #218838;
}


.total {
    width: 100%;
}

.title {
    background-color: white;
    height: 70px;
}

.logo {
    margin-left: 50px;
    height: 100%;
    display: inline-block;
}

.logo img {
    width: 100%;
    height: 90%;
}

.system_name {
    position: absolute;
    height: 70px;
    display: inline-block;
    margin-left: 10px;
    text-align: center;
    font-size: 20px;
}

.list {
    position: absolute;
    display: inline-block;
    margin-left: 250px;
    margin-top: 22px;
}

.list span {
    padding-right: 30px;
    color: black;
    font-size: 17px;
}

.list span:hover {
    opacity: 0.7;
    text-decoration: underline;
    color: #ff9d00;
}

a {
    color: inherit;
    text-decoration: none;
}

.user {
    position: absolute;
    display: inline-block;
    right: 200px;
    margin-top: 22px;
    color: #ff9d00;
}

.login:hover {
    opacity: 0.7;
    text-decoration: underline;
    font-weight: bolder;
}

.registration:hover {
    opacity: 0.7;
    text-decoration: underline;
    font-weight: bolder;
}

.index_tail {
    width: 100%;
    height: 70px;
    background-color: #3adcae;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-style: italic;
    color: white;
    margin-top: 20px;
    text-align: center;
    line-height: 70px;
    border-bottom: 4px solid rgb(85, 127, 204);
}

#id1 {
    width: auto;
    height: 200px;
    float: left;
}

</style>