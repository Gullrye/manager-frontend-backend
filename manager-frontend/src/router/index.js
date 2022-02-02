import { createRouter, createWebHashHistory } from 'vue-router'
import storage from '../utils/storage'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/main',
    component: () => import('../views/main/main.vue'),
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/main/system/welcome',
    component: () => import('../views/main/main.vue'),
    children: [
      {
        path: 'system/welcome', // children path 前面不需要加 '/'
        name: 'welcome',
        component: () => import('../views/main/system/welcome.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/not-found/not-found.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const { token } = storage.getItem('userInfo')
    if (!token) {
      return '/login'
    }
  }
})

export default router
