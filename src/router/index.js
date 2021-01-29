import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/index.vue')
  },
  {
    path: '/',
    name: 'Back',
    redirect: '/index',
    component: () => import('../views/Back/index.vue'),
    children: [
      {
        path: '/index',
        name: '首页',
        component: () => import('../components/Home/index.vue')
      },
      {
        path: '/noticeControl',
        name: '通知公告',
        component: () => import('../components/NoticeControl/index.vue')
      },
      {
        path: '/communityActivityControl',
        name: '小区活动',
        component: () => import('../components/CommunityActivityControl/index.vue')
      },
      {
        path: '/organizingActivityControl',
        name: '组织活动',
        component: () => import('../components/OrganizingActivityControl/index.vue')
      },
      {
        path: '/visitorControl',
        name: '访客通道',
        component: () => import('../components/VisitorControl/index.vue')
      },
      {
        path: '/reportRepairControl',
        name: '损坏报修',
        component: () => import('../components/ReportRepairControl/index.vue')
      },
      {
        path: '/reportLossControl',
        name: '失物报备',
        component: () => import('../components/ReportLossControl/index.vue')
      },
      {
        path: '/complaintControl',
        name: '投诉建议',
        component: () => import('../components/ComplaintControl/index.vue')
      },
      {
        path: '/marketControl',
        name: '二手市场',
        component: () => import('../components/MarketControl/index.vue')
      },
      {
        path: '/shareControl',
        name: '分享墙',
        component: () => import('../components/ShareControl/index.vue')
      },
      {
        path: '/accountControl',
        name: '账号管理',
        component: () => import('../components/AccountControl/index.vue')
      },
      {
        path: '/houseHoldControl',
        name: '住户管理',
        component: () => import('../components/HouseHoldControl/index.vue')
      },
      {
        path: '/adminAccountControl',
        name: '管理员账号',
        component: () => import('../components/AdminAccountControl/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
