<script setup> 

import Main from '../components/Main.vue';
import { RouterView } from 'vue-router';




</script>

<template>
  <div class="total">
        <Main></Main>

        <router-view></router-view>
      
  </div>  
</template>

<style scoped>
.total{
    width: 100%;
    height: 100%;
}




</style>
