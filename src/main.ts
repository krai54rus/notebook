import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router/index'
import regGlobalComponents from './plugins/global-components'
import '@/scss/styles.scss'
import '@/assets/css/classes.css'

const pinia = createPinia()

const app = createApp(App)

regGlobalComponents(app)

app.use(router).use(pinia).mount('#app')
