import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store/index'
import '@/scss/styles.scss'
import '@/assets/css/classes.css'

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(store).mount('#app')
