<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
     :error.sync="error"
       error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据
      loading: false, // 控制加载中效果
      finished: false, // 控制数据加载结束的状态
      timestamp: null,// 请求获取下一页数据的时间戳
      error:false,//列表加载失败的提示状态
    }
  },
  methods: {
    // 初始化或滚动到底部会触发
    // onLoad() {
    //   //1.请求获取数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //  // 2.把请求结果的数据放入list数组中
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 3.本次数据加载结束之后要把加载状态设置为false
    //     //loading关闭之后才能触发下一次的加载更多
    //     // 加载状态结束
    //     this.loading = false;
    //     // 4.判断数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // },
    async onLoad () {
      // 1.请求获取数据
      try {
        const { results, pre_timestamp } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()// 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        })
        // 2.把请求结果的数据放入list数组中
        this.list.push(...results)
        // 3.本次数据加载结束之后要把加载状态设置为false
        // loading关闭之后才能触发下一次的加载更多
        // 加载状态结束
        this.loading = false
        // 4.判断数据全部加载完成
        if (results.length) { // 更新获取下一页数据的时间戳
          this.timestamp = pre_timestamp
        } else { // 没有数据了 将finish设为true
          this.finished = true
        }
      } catch (error) {
        //展示错误提示状态
        this.error = true
        // 请求失败loading也要关闭
        this.loading = false
      }
    }
  }
}
</script>

<style>
</style>
