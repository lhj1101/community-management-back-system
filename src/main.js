import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// element按需引入
import {
  Button, Select
} from 'element-ui'

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

// // element按需使用
Vue.use(Button)
Vue.use(Select)

// 注册echarts必须的组件
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, CanvasRenderer]
)
echarts.use(
  [BarChart]
)

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
