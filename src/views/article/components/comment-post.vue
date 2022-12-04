<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="addComment" :disabled="!message.length">发布</van-button>
  </div>
</template>

<script>
import { addComment } from "@/api/comment";
export default {
  name: "CommentPost",
  components: {},
  props: {
    targetId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  inject:{
    articleId:{
        type:[Object,String,Number],
        required:true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async addComment() {
      try {
        this.$toast.loading({
          message: "发布中...",
          forbidClick: true,
          duration:0
        });
        const { new_obj } = await addComment({
          target: this.targetId, //评论的文章id或者评论id
          content: this.message, //评论的内容
          art_id:this.articleId || null,//对评论回复需要此参数值, 代表所属文章id, 对文章评论无需此参数
        });
        console.log(new_obj);
        //关闭弹出层
        //将发布内容显示到列表顶部
        this.$emit("update-data", new_obj);
        //清空文本框
        this.message = "";
        //提示发布成功
        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast.fail("发布失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>