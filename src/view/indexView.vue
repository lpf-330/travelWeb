<script setup>
import Carousel from '../components/Carousel.vue';


</script>

<template>
    <div class="main">

        </div>
        <div class="attraction-list">  
         <Carousel></Carousel>
         </div>
</template>

<style scoped>
.main img{
    width: 100%;
}


.attraction-list {  
  max-width: 95%;  
  margin: auto;  
  text-align: center;
  height: 795px; 
  padding-top: 3%;
  box-sizing: border-box; 
}  

.index_tail{
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
</style>