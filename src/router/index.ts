import { createWebHistory, createRouter } from 'vue-router'
import Main from '@/views/Main.vue'
import About from '@/views/About.vue'
import ToDo from '@/views/ToDo.vue'
import Notes from '@/views/Notes.vue'
import Test from '@/views/Test.vue'
import TestTest from '@/views/TestTest.vue'
import TestColor from '@/views/TestColor.vue'
import TestYaMap from '@/views/TestYaMap.vue'
import TestMain from '@/views/TestMain.vue'
import TestFunc from '@/views/TestFunc.vue'
import Components from '@/views/Components.vue'
import TodoTablePage from '@/views/ToDoTablePage.vue'
import TodoBoard from '@/views/TodoBoard.vue'
import Sobes from '@/views/Sobes.vue'
import RefactorPage from '@/views/RefactorPage.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/refactor',
    name: 'Refactor',
    component: RefactorPage,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/testmap',
    name: 'testmap',
    component: TestYaMap,
  },
  {
    path: '/testcolor',
    name: 'TestColor',
    component: TestColor,
  },
  {
    path: '/todo',
    name: 'ToDo',
    component: ToDo,
  },
  {
    path: '/notes',
    name: 'Notes',
    component: () => import('@/views/Notes.vue'),
  },
  {
    path: '/testfunc',
    name: 'TestFunc',
    component: TestFunc,
  },
  {
    path: '/sobes',
    name: 'Sobes',
    component: Sobes,
  },
  {
    path: '/test',
    name: 'Test',
    component: Test,
  },
  {
    path: '/testtest',
    name: 'TestTest',
    component: TestTest,
  },
  {
    path: '/testdnd',
    name: 'TestDnD',
    component: () => import('@/views/TodoBoard.vue'),
  },
  {
    path: '/testmain',
    name: 'TestMain',
    component: TestMain,
  },
  {
    path: '/views',
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
