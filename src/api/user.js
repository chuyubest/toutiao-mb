// 用户相关接口
import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/authorizations',
    method: 'post',
    data
  })
}
// 发送验证码:每个手机号 每分钟只发送一次
export function sendSms (mobile) {
  return request({
    url: `/sms/codes/${mobile}`,
    method: 'get'
  })
}
// 获取用户自己信息
export function getUserInfo () {
  return request({
    url: '/user',
    method: 'get'
  })
}
