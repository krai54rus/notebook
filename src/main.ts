import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store/index'
import '@/scss/styles.scss'
import '@/assets/css/classes.css'

createApp(App).use(router).use(store).mount('#app')
