import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import pinia from './stores'

createApp(App).use(pinia).use(router).mount('#app')
