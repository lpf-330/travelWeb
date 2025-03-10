import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import pinia from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(pinia).use(router).use(ElementPlus).mount('#app')
