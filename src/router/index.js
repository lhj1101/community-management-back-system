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
        name: 'Home',
        component: () => import('../components/Home/index.vue')
      },
      {
        path: '/noticeControl',
        name: 'NoticeControl',
        component: () => import('../components/NoticeControl/index.vue')
      },
      {
        path: '/communityActivityControl',
        name: 'CommunityActivityControl',
        component: () => import('../components/CommunityActivityControl/index.vue')
      },
      {
        path: '/organizingActivityControl',
        name: 'OrganizingActivityControl',
        component: () => import('../components/OrganizingActivityControl/index.vue')
      },
      {
        path: '/visitorControl',
        name: 'VisitorControl',
        component: () => import('../components/VisitorControl/index.vue')
      },
      {
        path: '/reportRepairControl',
        name: 'ReportRepairControl',
        component: () => import('../components/ReportRepairControl/index.vue')
      },
      {
        path: '/reportLossControl',
        name: 'ReportLossControl',
        component: () => import('../components/ReportLossControl/index.vue')
      },
      {
        path: '/complaintsComplaintControl',
        name: 'ComplaintsComplaintControl',
        component: () => import('../components/ComplaintsComplaintControl/index.vue')
      },
      {
        path: '/marketControl',
        name: 'MarketControl',
        component: () => import('../components/MarketControl/index.vue')
      },
      {
        path: '/shareControl',
        name: 'ShareControl',
        component: () => import('../components/ShareControl/index.vue')
      },
      {
        path: '/accountControl',
        name: 'AccountControl',
        component: () => import('../components/AccountControl/index.vue')
      },
      {
        path: '/houseHoldControl',
        name: 'HouseHoldControl',
        component: () => import('../components/HouseHoldControl/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
