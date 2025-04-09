<template>
  <div class="famous-person-detail">
    <h1 class="person-title">{{ person.name }}</h1>
    <div class="date-info">
      <span><strong>创建时间:</strong> {{ createdAt }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span><strong>更新时间:</strong> {{ updatedAt }}</span>
    </div>

    <div class="box">
      <div class="image-container">
        <img :src="'src/assets/picture/picture_package/famouspeople/' + person.id + '.jpg'" alt="Person's Image"
          class="person-image" />
      </div>

      <div class="biography">
        <p>{{ person.biography }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();


const person = ref({
  id: '',
  name: '',
  image: '',
  biography: ''
})

person.value = history.state.personData



let createdAt = ref("2024-01-01");
let updatedAt = ref("2024-12-01");

</script>

<style scoped>
.famous-person-detail {
  max-width: 95%;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.person-title {
  text-align: center;
}

.date-info {
  margin-bottom: 20px;
  font-size: 0.9em;
  color: #555;
  text-align: center;
}

.box {
  height: 60%;
  width: 92%;
  min-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.image-container {
  text-align: center;
  height: 400px;
  width: 400px;
}

.person-image {
  width: 90%;
  height: 90%;
  border-radius: 8px;
}

.biography {
  margin-bottom: 20px;
  text-align: center;
  padding-left: 50px;
  padding-right: 50px;
  box-shadow: 0px 0.5vh 1vh 0 #acacac;
  border-radius: 10px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.likes {
  text-align: center;
}
</style>