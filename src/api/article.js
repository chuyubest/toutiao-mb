// 文章请求模块
import request from '@/utils/request'

// 获取文章列表数据
export function getArticleList (params) {
  return request({
    url: '/articles',
    method: 'get',
    params
  })
}
//根据id获取文章详情
export function getArticleDetailById(articleId){
  return request({
    url:`/articles/${articleId}`,
    method:'get'
  })
}
//收藏文章
//添加收藏
export const collectArticle = (articleId)=>{
  return request({
    url:'/article/collections',
    method:'post',
    data:{
      target:articleId
    }
  })
}
//取消收藏
export const cancelCollect = (articleId)=>{
  return request({
    url:`/article/collections/${articleId}`,
    method:'delete'
  })
}

//文章点赞
export function likeArticle(artId){
  return request({
    url:'/article/likings',
    method:'post',
    data:{
      target:artId
    }
  })
}

//取消点赞
export const cancelLike = (articleId)=>{
  return request({
    url:`/article/likings/${articleId}`,
    method:'delete'
  })
}
