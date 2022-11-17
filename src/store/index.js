import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken, removeToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken()
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失数据 持久化
      setToken(data)
    },
    removeUser (state) {
      state.user = null
      removeToken()
    }
  },
  actions: {
  }
})
