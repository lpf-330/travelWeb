<script setup>
import { onMounted } from "vue";
import { ref } from "vue";

const imgList = ref([1, 2, 3, 4, 5, 6])

onMounted(() => {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
})


</script>

<template>
  <div class="box">
    <!-- Swiper -->
    <div class="swiper mySwiper">
      <div class="swiper-wrapper">
        <img class="swiper-slide" v-for="value in imgList" v-bind:key="value"
          :src="'src/assets/picture/picture_package/attraction/' + value + '.jpg'"></img>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    </div>
  </div>

</template>


<style scoped>
.box {
  width: 70%;
  height: 85%;
  margin-left: 15%;
  background-color: aqua;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.37);
  background-color: white;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>