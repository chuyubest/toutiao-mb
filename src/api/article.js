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
