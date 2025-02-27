<script setup> 

import Main from '../components/Main.vue';
import { RouterView } from 'vue-router';


</script>

<template>
  <div class="total">
        <Main></Main>

        <router-view></router-view>
      
      <!-- <div class="index_tail">COPYRIGHT@ 23级软开2班 风雨无阻小组</div> -->
  </div>  
</template>

<style scoped>
.total{
    width: 100%;
    height: 100%;
}




</style>
