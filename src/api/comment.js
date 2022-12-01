// 评论请求模块
import request from '@/utils/request'

//获取评论列表
export function getCommentList(params){
    return request({
        url:'/comments',
        params
    })
}