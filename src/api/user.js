// 用户相关接口
import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/authorizations',
    method: 'post',
    data
  })
}
