// 本地存储方法管理
const TOKEN_KEY = 'TOUTIAO_USER'
export function setToken (token) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}
export function removeToken () {
  localStorage.removeItem(TOKEN_KEY)
}
export function getToken () {
  return JSON.parse(localStorage.getItem(TOKEN_KEY))
}
