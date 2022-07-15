import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import NbButton from '@/components/generic/NbButton.vue'
import NbToolbar from '@/components/generic/NbToolbar.vue'
import router from '@/router/index'
import store from '@/store/index'
import '@/scss/styles.scss'
import '@/assets/css/classes.css'

const pinia = createPinia()

const app = createApp(App)

app.component('NbButton', NbButton)
app.component('NbToolbar', NbToolbar)

app.use(router).use(pinia).use(store).mount('#app')
