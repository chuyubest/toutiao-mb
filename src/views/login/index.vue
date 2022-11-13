<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- form表单 -->
    <van-form @submit="onSubmit">
      <van-field name="用户名" placeholder="请输入手机号">
        <i class="iconfont icon-shouji" slot="left-icon"></i>
      </van-field>
      <van-field type="password" name="验证码" placeholder="请输入验证码">
        <i class="iconfont icon-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-button class="send-sms-btn" round  size="small" type="default">获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" round block type="info" native-type="submit">登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>

<style lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn{
    width: 160px;
    height: 50px;
    line-height: 50px;
    font-size: 10px;
    color: #666;
    background-color: #ededed;
  }
  .login-btn-wrap{
    padding: 53px 33px;
    .login-btn{
        background-color: #6db4fb;
        border: none;
    }
  }
}
</style>
