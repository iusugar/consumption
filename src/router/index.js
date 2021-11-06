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
          name: 'Dashboard'
          // meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
        }
      ]
    },
    {
      path: '/management',
      component: Layout,
      redirect: '/management/add-new',
      children: [
        {
          path: 'add-new',
          component: () => import('@/views/management/addNew'),
          name: 'Management',
          meta: { title: 'Management', icon: 'management', affix: true }
        },
        {
          path: 'list',
          component: () => import('@/views/management/list'),
          name: 'List'
        }
      ]
    },
    {
      path: '/analysis',
      component: Layout,
      redirect: '/analysis/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/analysis/index'),
          name: 'Analysis',
          meta: { title: 'Management', icon: 'management', affix: true }
        }
      ]
    },
    {
      path: '/location',
      component: Layout,
      redirect: 'location/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/location/index')
        }
      ]
    },
    {
      path: '/chart',
      component: () => import('@/views/test/TestEchart')
    },
    {
      path: '/next',
      component: () => import('@/views/test/TestNextClick')
    }
  ]
})
