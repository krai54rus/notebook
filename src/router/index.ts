import { createWebHistory, createRouter } from 'vue-router'
import Main from '@/components/Main.vue'
import About from '@/components/About.vue'
import ToDo from '@/components/ToDo.vue'
import Notes from '@/components/Notes.vue'
import Test from '@/components/Test.vue'
import TestTest from '@/components/TestTest.vue'
import TestColor from '@/components/TestColor.vue'
import TestYaMap from '@/components/TestYaMap.vue'
import TestMain from '@/components/TestMain.vue'
import TestFunc from '@/components/TestFunc.vue'
import Components from '@/components/Components.vue'
import TodoTablePage from '@/components/todo/ToDoTablePage.vue'
import TodoBoard from '@/components/test/TodoBoard.vue'

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
    component: Notes,
  },
  {
    path: '/testfunc',
    name: 'TestFunc',
    component: TestFunc,
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
    component: TodoBoard,
  },
  {
    path: '/testmain',
    name: 'TestMain',
    component: TestMain,
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
