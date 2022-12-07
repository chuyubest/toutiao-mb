<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="$emit('close')"
    :default-index="value"
  />
</template>

<script>
import { updateUserProfile } from "@/api/user";
export default {
  data() {
    return {
      columns: ["男", "女"],
    };
  },
  props:{
    value:{
        type:[Number,String],
        required:true
    }
  },
  methods: {
    //点击确定按钮
    async onConfirm(value, index) {
      try {
        this.$toast.loading({
            message:'保存中...',
            duration:0,
            forbidClick:true
        })
        // 发请求,修改性别 index:0->男 1=>女
        await updateUserProfile({ gender: index });
        this.$toast('修改成功!')
        //关闭弹层
        this.$emit('close')
        //修改视图
        this.$emit('input',index) 
      } catch (error) {
        this.$toast('修改失败,请重试')
      }
    },
  },
};
</script>

<style>
</style>