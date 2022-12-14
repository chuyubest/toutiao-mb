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
// 获取用户频道列表
export function getUserChannels () {
  return request({
    url: '/user/channels',
    method: 'get'
  })
}

//关注用户
export function addFollow(userId){
  return request({
    url:'/user/followings',
    method:'post',
    data:{
      target:userId
    }
  })
}
//取消关注用户
export function cancelFollow(userId){
  return request({
    url:`/user/followings/${userId}`,
    method:'delete',
  })
}

//获取用户个人资料
export function getUserProfile(){
  return request({
    url:'/user/profile',
    method:'get'
  })
}
//修改个人信息
export function updateUserProfile(data){
  return request({
    url:'/user/profile',
    method:'patch',
    data
  })
}

//修改用户头像
export function updatePhoto(data){
  return request({
    url:'/user/photo',
    method:'patch',
    data
  })
}


