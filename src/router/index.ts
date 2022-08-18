import { createWebHistory, createRouter } from 'vue-router'
import Main from '@/components/Main.vue'
import About from '@/components/About.vue'
import ToDo from '@/components/ToDo.vue'
import Test from '@/components/Test.vue'
import Components from '@/components/Components.vue'
import TodoTablePage from '@/components/todo/TodoTablePage.vue'

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
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/components',
    name: 'Components',
    component: Components,
  },
  {
    path: '/todo/table/:id',
    name: 'ToDoTable',
    component: TodoTablePage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
