<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="
        currentComment.reply_count > 0
          ? `${currentComment.reply_count}条回复`
          : '暂无回复'
      "
    >
      <van-icon name="cross" slot="left" @click="$emit('closePop')"></van-icon>
    </van-nav-bar>

    <div class="scroll-wrap">
      <CommentItem :comment="currentComment" />
      <!-- 评论的回复列表 -->
      <van-cell title="全部回复"></van-cell>
      <CommentList :source="currentComment.com_id" type="c" :list="replyList"/>
    </div>

    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPost = true">写评论</van-button>
    </div>

    <!-- 发布评论 -->
    <van-popup v-model="isPost" position="bottom">
        <CommentPost :targetId="currentComment.com_id" @update-data="postSuccess"/>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import CommentList from "./comment-list.vue";
import CommentPost from './comment-post.vue'
export default {
  name: "CommentReply",
  data() {
    return {
        isPost:false,
        replyList:[]
    };
  },

  props: {
    currentComment: {
      type: Object,
      required: true,
    },
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  methods:{
    postSuccess(new_comment) {
      //关闭弹层
      this.isPost = false;
      //更新回复的数量
      this.currentComment.reply_count++
      this.replyList.unshift(new_comment);
    },
  }
};
</script>

<style scoped lang="less">
.comment-reply .van-nav-bar .van-icon {
  color: #1989fa !important;
}
.scroll-wrap{
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow-y: auto;
}
.post-wrap {
  height: 88px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>