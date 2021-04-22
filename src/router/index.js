import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/user/index'),
          name: 'dashboard'
        }
      ]
    },
    {
      path: '/chart',
      component: () => import('@/views/TestEchart')
    },
    {
      path: '/next',
      component: () => import('@/views/TestNextClick')
    }
  ]
})
