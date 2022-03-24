import { createRouter, createWebHistory } from 'vue-router'
import Director from '../views/Director.vue'
import Operator from '../views/Operator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:Director
    }
,
    {
      path: '/director',
      name: 'director',
      component: Director
    },
    {
      path: '/operator',
      name: 'operator',
      component: Operator
    }
  ]
})

export default router
