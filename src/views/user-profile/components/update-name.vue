<template>
  <div class="update-name">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="updateName"
    />
    <div class="field-wrap">
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="11"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
  name: "UpdateName",
  data(){
    return {
        message:this.value
    }
  },
  props:{
    value:{
        type:String,
        required:true
    }
  },
  methods: {
    async updateName() {
        this.$toast.loading({
            message:'保存中...',
            forbidClick:true,//禁止背景点击
            duration:0
        })
        try{
            if(!this.message.length){
                this.$toast.fail('昵称不能为空!')
                return
            }
            await updateUserProfile({name:this.message})
            this.$toast.success('修改成功')
            //关闭弹窗
            this.$emit('close')
            //修改父组件里的name
            this.$emit('input',this.message)
        }catch(error){
            this.$toast('修改失败')
        }
        
    },
  },
};
</script>

<style lang="less" scoped>
.field-wrap {
  padding: 20px;
}
</style>