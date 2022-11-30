<template>
  <van-icon
    :color="attitude === -1 ? '#777' : '#e5645f'"
    :name="attitude === -1 ? 'good-job-o' : 'good-job'"
    @click="onLike"
  />
</template>

<script>
import { likeArticle, cancelLike } from "@/api/article";
export default {
  name: "LikeArticle",
  props: {
    attitude: {
      type: Number,
      required: true,
    },
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  methods: {
    async onLike() {
      try {
        let status = -1
        if (this.attitude == -1) {
          //没有点赞,进行点赞
          await likeArticle(this.articleId);
          this.$toast.success("点赞成功");
          status = 1
        } else {
          await cancelLike(this.articleId);
          this.$toast.success("取消成功");
        }
         //更新视图
          this.$parent.detail.attitude = status;
      } catch (error) {
        this.$toast.fail("操作失败,请重试");
      }
    },
  },
};
</script>

<style>
</style>