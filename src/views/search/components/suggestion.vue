<template>
  <div class="suggestion">
    <van-cell v-for="(suggestion,index) in suggestions" 
     icon="search" 
    :key="index"
    @click="$emit('search',suggestion)"
    >
        <span slot="title" v-html="highlight(suggestion)"></span>
    </van-cell>

  </div>
</template>

<script>
import {getSearchSuggestion} from '@/api/search'
import {debounce} from 'lodash'
export default {
    name:'Suggestion',
    data(){
        return {
            suggestions:[],//联想建议数据列表
        }
    },
    props:{
        searchText:{
            type:String,
            required:true
        }
    },
    watch:{
        searchText:{
            // handler(newVal){
            //     this.getSearchSuggestion(newVal)
            //     console.log(newVal);
            // },
            //debounce两个参数
            //1.需要防抖的操作
            //2.延迟时间
            handler:debounce(function(newVal){
                this.getSearchSuggestion(newVal)
                console.log(newVal)
            },200),
            immediate:true,//第一次监听就执行
        }
    },
    methods:{
        async getSearchSuggestion(q){
            try{
               const {options} =  await getSearchSuggestion(q)
               this.suggestions = options
               console.log(options);
            }catch(error){
                this.$toast('数据获取失败,请稍后重试!')
            }
        },
        //搜索关键字高亮
        highlight(str){
            const reg = new RegExp(this.searchText,'gi')
            const result = str.replaceAll(reg,`<span style="color:#3296fa">${this.searchText}</span>`)
            // console.log(result);
            return result
        }
    }
}
</script>

<style>

</style>