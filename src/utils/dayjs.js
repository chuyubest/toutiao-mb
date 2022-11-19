import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
//加载中文语言包
import 'dayjs/locale/zh-cn'
//dayjs默认语言是英文
dayjs.locale('zh-cn')
//dayjs()获取最新日期
// console.log(dayjs().format('YYYY-MM-DD'))
// console.log(dayjs().to(dayjs('1990-01-01')));

// filter 过滤器 第一个参数是过滤器名称,第二个参数是过滤器的处理函数
// 使用:{{表达式|过滤器名称}}
//表达式的结果会作为参数传递到过滤器函数中
Vue.filter('relativeTime',(value)=>{
    return dayjs().to(dayjs(value))
})
