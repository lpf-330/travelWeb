<template>
  <div class="attraction-detail">
    <h1 class="attraction-title">{{ attraction.name }}</h1>
    <div class="attraction-meta">
      <span>创建时间: {{ attraction.createdAt }}&nbsp&nbsp&nbsp&nbsp</span>
      <span>更新时间: {{ attraction.updatedAt }}&nbsp&nbsp&nbsp&nbsp;</span>
      <span>所在地区: {{ attraction.region }}</span>
    </div>
    <div class="attraction-content">
      <div class="attraction-image">
        <img :src="attraction.image" alt="景点图片" />
      </div>
      <div class="attraction-info">
        <h2>相关信息</h2>
        <p><strong>开放时间:</strong> {{ attraction.openingHours }}</p>
        <p><strong>交通信息:</strong> {{ attraction.transportation }}</p>
        <p><strong>景点描述:</strong> {{ attraction.description }}</p>
      </div>
    </div>
    <div class="related-figures">
      <h2>相关名人</h2>
      <div class="figures-list">
        <div v-for="figure in attraction.relatedFigures" :key="figure.id" class="figure" @click="toFamousPeople">
          <img :src="figure.image" alt="名人图片" />
          <div class="figure-info">
            <h3>{{ figure.name }}</h3>
            <p>{{ figure.biography }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="likes-line">
      <LikeButton></LikeButton>
    </div>
    <CommentsArea></CommentsArea>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CommentsArea from '../components/CommentsArea.vue';
import LikeButton from '../components/LikeButton.vue';
import router from '../router';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(JSON.parse(history.state.data))

// let attraction = ref({
//   name: "黄山",
//   createdAt: "2024-01-01",
//   updatedAt: "2024-01-15",
//   region: "安徽省",
//   image: "https://via.placeholder.com/200",
//   openingHours: "08:00 - 18:00",
//   transportation: "可乘坐公交车或自驾前往",
//   description: "请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!请输入景点的介绍!",
//   relatedFigures: [
//     {
//       id: 1,
//       name: "李白",
//       image: "https://via.placeholder.com/200",
//       biography: "唐代著名诗人，以其豪放的诗风著称。请输入名人生平！请输入名人生平！请输入名人生平！请输入名人生平！请输入名人生平！请输入名人生平！请输入名人生平！请输入名人生平！请输入名人生平！请输入名人生平！请输入名人生平！",
//     },
//     {
//       id: 2,
//       name: "徐霞客",
//       image: "https://via.placeholder.com/200.jpg",
//       biography: "明代地理学家，以其游记著称。",
//     },
//   ],
//   likes: 0,
// });
const attraction = ref({});

 /**   
   * 获取单个景点的详细信息   
   *   
   * 请求参数：   
   * attraction_id: String  // 景点ID   
   *   
   * 响应参数：   
   * {   
   *   name: String,            // 景点名称   
   *   created_at: String,     // 创建时间   
   *   updated_at: String,      // 更新时间   
   *   location: String,        // 所在地区   
   *   image: String,            // 景点图片地址   
   *   opening_hours: String,   // 开放时间   
   *   transportation: String,  // 交通信息   
   *   description: String,     // 景点描述   
   *   relatedFigures: [{     // 相关名人信息数组   
   *     person_id: String,     // 名人ID   
   *     name: String,         // 名人姓名   
   *     image: String,        // 名人图片地址   
   *     message: String       // 名人介绍   
   *   }],   
   *   likes: Number           // 点赞数量   
   * }   
   */  
const fetchAttractionDetail = async () => {  
  try {  
    const response = await axios.post("http://localhost:8081/getAttractionDetail",{attractionId:route.params.id});//路由未测试  
    if (response.data) {  
      attraction.value = {  
        name: response.data.name,  
        createdAt: response.data.created_at,  
        updatedAt: response.data.updated_at,  
        region: response.data.location,  
        image: response.data.image,  
        openingHours: response.data.opening_hours,  
        transportation: response.data.transportation,  
        description: response.data.description,  
        // 下面的relatedFigures是获取名人表的信息
        relatedFigures: response.data.relatedFigures.map(figure => ({  
          id: figure.person_id,  
          name: figure.name,  
          image: figure.image,  
          biography: figure.message  
        })),
        likes: response.data.like
      };  
    }  
    console.log("获取数据成功:", response.data);  
  } catch (error) {  
    console.error("获取数据失败:", error);  
  }  
};  
console.log(route.params.id)

//fetchAttractionDetail();

const toFamousPeople = () => {
  router.push("/index/famousPeople")
}


</script>

<style scoped>
.attraction-detail {
  max-width: 85%;
  margin: auto;
  padding: 20px;
}

.attraction-title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 10px;
}

.attraction-meta {
  text-align: center;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 20px;
}

.attraction-content {
  display: flex;
  margin-bottom: 20px;
}

.attraction-image img {
  width: 600px;
  height: 400PX;
  border-radius: 8px;
}

.attraction-info {
  text-align: left;
  margin-left: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.attraction-info:hover {
  transform: scale(1.02);
}

.related-figures {
  max-width: 100%;
  /* 设置最大宽度 */
  margin: 0 auto;
  /* 上下边距为 0，左右边距自动，居中 */
  text-align: center;
  /* 标题和文本居中 */
  padding: 20px;
  /* 内边距 */
  background-color: #f9f9f9;
  /* 背景颜色，可选 */
  border-radius: 8px;
  /* 圆角边框 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  /* 阴影效果 */
}

.figures-list {
  display: flex;
  /* 使用弹性布局 */
  flex-wrap: wrap;
  /* 允许换行 */
  justify-content: center;
  /* 水平居中子项目 */
  gap: 200px;
  /* 子项目之间的间隔 */
}

.figure {
  flex: 0 1 200px;
  /* 根据屏幕宽度调整占用空间 */
  text-align: center;
  /* 名字和介绍文本居中 */
  cursor: pointer;
}

.figure img {
  max-width: 100%;
  /* 图片宽度适应容器 */
  height: auto;
  /* 高度自动 */
  border-radius: 50%;
  /* 头像圆形 */
}

.figure-info h3 {
  margin: 10px 0 5px;
  /* 上边距10px，下边距5px */
  font-size: 1.2em;
  /* 增大标题字体 */
  color: #333;
  /* 标题颜色 */
}

.figure-info p {
  color: #666;
  /* 描述文本颜色 */
  font-size: 0.9em;
  /* 描述文本大小 */
  width: 500px;
}

.likes-line {
  text-align: center;
  margin-top: 20px;
}
</style>