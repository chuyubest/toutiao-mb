import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    redirect: '/home',
    // name: 'layout',
    component: () => import('@/views/layout'),
    children: [{
        path: 'home', // 默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'question',
        name: 'question',
        component: () => import('@/views/question')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',//动态路由
    name: 'article',
    component: () => import('@/views/article'),
    props:true,//props解耦就是将路由参数映射到组建的props数据上
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('@/views/user-profile'),
  },
]

const router = new VueRouter({
  routes
})

export default router
