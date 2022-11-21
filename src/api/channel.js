import request from '@/utils/request'
//处理频道模块的接口
export function getAllChannels(){
    return request({
        url:'/channels',
        method:'get'
    })
}