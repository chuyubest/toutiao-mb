<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择生日"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirm"
    @cancel="$emit('close')"
  />
</template>

<script>
import { updateUserProfile } from "@/api/user";
import dayjs from "dayjs";
export default {
  name: "UpdateBirthday",
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
    };
  },
  props: {
    value: {
      type:String,
      required: true,
    },
  },
  methods: {
    async onConfirm(value) {
      try {
        // 发送请求,修改生日
        const formatDate = dayjs(value).format("YYYY-MM-DD")
        await updateUserProfile({
          birthday: formatDate,
        })
        this.$toast("修改成功!");
        //关闭弹窗
        this.$emit("close");
        //修改视图
        this.$emit("input", formatDate);
      } catch (error) {
        this.$toast.fail('修改失败,请重试')
      }
    },
  },
};
</script>

<style>
</style>