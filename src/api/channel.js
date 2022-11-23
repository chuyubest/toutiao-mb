import request from '@/utils/request'
//处理频道模块的接口
export function getAllChannels() {
  return request({
    url: '/channels',
    method: 'get'
  })
}
//更新我的频道

export function updateMyChannel(channel) {
  return request({
    url: '/user/channels',
    method: 'patch',
    data:{
        channels:[channel]
    }
  })

}
