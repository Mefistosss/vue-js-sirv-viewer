import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Main from '@/views/Main.vue';
import Example1 from '@/views/Example1.vue';
import Example2 from '@/views/Example2.vue';
import Example3 from '@/views/Example3.vue';
import Example4 from '@/views/Example4.vue';
import Example5 from '@/views/Example5.vue';
import Example6 from '@/views/Example6.vue';
import Example7 from '@/views/Example7.vue';
import Example8 from '@/views/Example8.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Main
  },
  {
    path: '/example1',
    name: 'example1',
    component: Example1
  },
  {
    path: '/example2',
    name: 'example2',
    component: Example2
  },
  {
    path: '/example3',
    name: 'example3',
    component: Example3
  },
  {
    path: '/example4',
    name: 'example4',
    component: Example4
  },
  {
    path: '/example5',
    name: 'example5',
    component: Example5
  },
  {
    path: '/example6',
    name: 'example6',
    component: Example6
  },
  {
    path: '/example7',
    name: 'example7',
    component: Example7
  },
  {
    path: '/example8',
    name: 'example8',
    component: Example8
  },

  { path: '/:catchAll(.*)', redirect: '/' }

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
