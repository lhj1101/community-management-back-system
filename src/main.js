import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 解决路由地址重复的报错问题
import VueRouter from 'vue-router'

// 全局导入css
import './assets/css/all.css'
// element完整引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 引入柱状图图表，图表后缀都为 Chart
import {
  BarChart
} from 'echarts/charts'

// element完整使用
Vue.use(ElementUI)

// 注册echarts必须的组件
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, CanvasRenderer]
)
echarts.use(
  [BarChart]
)

Vue.prototype.$axios = axios

Vue.config.productionTip = false

// 解决路由地址重复的报错问题
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
