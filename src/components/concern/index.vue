<template>
  <van-button
    v-if="!isFollowed"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
    >关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    round
    :loading="loading"
    size="small"
    @click="onFollow"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, cancelFollow } from "@/api/user";
export default {
  name: "Concern",
  data() {
    return {
      loading: false,
    };
  },
  props: {
    userId: {
      type: [String, Object, Number],
      required: true,
    },
    isFollowed: {
      type: Boolean,
    },
  },
  //关注与取消关注用户
  methods: {
    async onFollow() {
      this.loading = true;
      try {
        if (this.isFollowed) {
          //已关注的话,就取消关注
          await cancelFollow(this.userId);
        } else {
          await addFollow(this.userId);
        }
        // 更新视图状态
        this.$emit("updateConcern", !this.isFollowed);
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast("不能关注自己");
        }
        this.$toast("操作失败,请重试!");
        console.log(error);
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>