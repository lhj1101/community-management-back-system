import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // modules: {
  // }
  state: {
    openTab: [],
    activeIndex: ''
  },
  mutations: {
    add_tabs (state, data) {
      this.state.openTab.push(data)
    },
    delete_tabs (state, route) {
      let index = 0
      for (const gohh of state.openTab) {
        if (gohh.route === route) {
          break
        }
        index++
      }
      this.state.openTab.splice(index, 1)
    },
    set_active_index (state, index) {
      this.state.activeIndex = index
    },
    outLogin () {
      this.state.activeIndex = ''
      this.state.openTab = []
    }
  }
})
