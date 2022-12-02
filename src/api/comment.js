// 评论请求模块
import request from '@/utils/request'

//获取评论列表
export function getCommentList(params){
    return request({
        url:'/comments',
        params
    })
}

//对评论点赞
export function addLike(target){
    return request({
        url:'/comment/likings',
        method:'post',
        data:{
            target
        }
    })
}

//取消点赞
export function cancelLike(commentId){
    return request({
        url:`/comment/likings/${commentId}`,
        method:'delete',
        
    })
}
