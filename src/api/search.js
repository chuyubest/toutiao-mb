// 搜索模块相关的api接口
import request from '@/utils/request'

//获取联想建议
export function getSearchSuggestion(q){
    return request({
        url:'/suggestion',
        method:'get',
        params:{
            q
        }
    })
}

//获取搜索结果
export function getSearchResult(params){
    return request({
        url:'search',
        method:'get',
        params
    })
}