import { createWebHistory, createRouter } from 'vue-router'
import Main from '@/components/Main.vue'
import About from '@/components/About.vue'
import ToDo from '@/components/ToDo.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: ToDo,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
