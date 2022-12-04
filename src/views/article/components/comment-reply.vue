<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="currentComment.reply_count > 0?`${currentComment.reply_count}条回复`:'暂无回复'"
    >
        <van-icon name="cross" slot="left" @click="$emit('closePop')"></van-icon>
    </van-nav-bar>
    <CommentItem  :comment="currentComment"/>
    <!-- 评论的回复列表 -->
    <van-cell title="全部回复"></van-cell>
    <CommentList :source="currentComment.com_id" type="c" :list="list"/>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
export default {
  name: "CommentReply",
  data(){
    return {
        list:[]
    }
  },
  props: {
    currentComment: {
      type: Object,
      required: true,
    },
  },
  components:{
    CommentItem,
    CommentList
  }
};
</script>

<style scoped lang="less">
    .comment-reply .van-nav-bar .van-icon{
        color: #1989fa !important;
    }
</style>