<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    @error="error"
    error-text="加载失败,请点击重试!"
  >
    <van-cell 
    v-for="item in list" 
    :key="item.com_id" 
    :title="item.content" />
  </van-list>
</template>

<script>
import { getCommentList } from "@/api/comment";
export default {
  name: "CommentList",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, //用于获取下一页数据的标记
      error:false
    };
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
  },
  methods: {
    async onLoad() {
      // 1.请求获取数据
      try {
        const { results, last_id } = await getCommentList({
          type: "a", //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, //源id，文章id或评论id
          offset: this.offset, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 20, //获取的评论数据个数
        });
        console.log(results);
        // 2.将数据添加到列表中
        this.list.push(...results);
         // 3.关闭loading
        this.loading = false;
      // 4.判断是否还有数据 有就更新获取下一页的数据页码 没有 将finish关闭
        if(results.length){
            this.offset = last_id
        }else{
            this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
        // this.$toast.fail("请求数据失败,请重试");
      }

     

      // 加载状态结束

      // 数据全部加载完成
    },
  },
};
</script>

<style>
</style>