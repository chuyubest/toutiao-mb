<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    @error="error"
    error-text="加载失败,请点击重试!"
  >
    <CommentItem v-for="item in list" :key="item.com_id" @replyClick="$emit('replyClick',$event)"  :comment="item" @updateLike="item.is_liking = $event"/>
  </van-list>
</template>

<script>
import { getCommentList } from "@/api/comment";
import CommentItem from "./comment-item";
export default {
  name: "CommentList",
  data() {
    return {
    //   list: [],
      loading: false,
      finished: false,
      offset: null, //用于获取下一页数据的标记
      error: false,
    };
  },
  components: {
    CommentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    list:{
        type:Array,
        default:()=>[]
    },
    type:{
      type:String,
      default:'a',
      //自定义prop数据验证
      validator(value){
        return ['a','c'].includes(value)
      }
    }
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      // 获取文章评论和评论回复接口一样只是参数不一样
      // 1.请求获取数据
      try {
        const { results, last_id, total_count } = await getCommentList({
          type: this.type, //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, //源id，文章id或评论id
          offset: this.offset, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 20, //获取的评论数据个数
        });
        console.log(results);
        console.log(total_count);
        // 2.将数据添加到列表中
        this.list.push(...results);
        this.$parent.totalCommentCount = total_count;
        // 3.关闭loading
        this.loading = false;
        // 4.判断是否还有数据 有就更新获取下一页的数据页码 没有 将finish关闭
        if (results.length) {
          this.offset = last_id;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
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