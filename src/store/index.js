import Vue from 'vue'
import Vuex from 'vuex'
// import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  // getters
  state: {
    count: 1
  }
})

export default store
