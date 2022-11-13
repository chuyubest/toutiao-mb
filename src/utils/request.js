/* 请求模块 */
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 接口的基础路径
  timeout: 5000// 请求超时时间
})
// 请求拦截器

// 响应拦截器
export default request
