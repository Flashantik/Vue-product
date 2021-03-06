import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import common from './common'
import ads from './ads'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user, common, ads
  }
})
