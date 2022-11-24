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