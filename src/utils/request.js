/* 请求模块 */
// 引入store
import store from '@/store'
import axios from 'axios'
const request = axios.create({
  baseURL: '/v1_0' // 接口的基础路径
  // timeout: 5000// 请求超时时间
})
// 请求拦截器
request.interceptors.request.use(config => {
  if (store.state.user || store.state.user.token) {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  // 务必要返回config不然请求发不出去
  return config
}, error => {
  // 请求出错 (还没有发出去)
  return Promise.reject(new Error(error))
})
// 响应拦截器
request.interceptors.response.use(response => {
  // axios默认加了一层data
  const { data } = response.data
  return data
})
export default request
