import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Info from '../views/Info.vue'
import Setting from '../views/Setting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  }
]

const router = new VueRouter({
  routes
})

export default router
