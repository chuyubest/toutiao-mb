<template>
  <van-icon
    :color="value ? '#ffa500' : '#777'"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
  />
</template>

<script>
import { collectArticle, cancelCollect } from "@/api/article";
export default {
  name: "CollectArticle",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    artId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  methods: {
    async onCollect() {
      try {
        if (this.value) {
          //如果当前收藏了该文章,则取消收藏
          await cancelCollect(this.artId);
          this.$toast.success("取消成功");
        } else {
          //添加收藏
          await collectArticle(this.artId);
          this.$toast.success("收藏成功");
        }
        //   更新视图
        this.$emit("input", !this.value);
      } catch (error) {
        this.$toast.fail("操作失败,请重试");
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>