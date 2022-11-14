const TOKEN_KEY = 'TOUTIAO_USER'
export default {
  state: {
    user: JSON.parse(localStorage.getItem(TOKEN_KEY))
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失数据 持久化
      localStorage.setItem(TOKEN_KEY, JSON.stringify(data))
    }
  },
  actions: {
  }
}
