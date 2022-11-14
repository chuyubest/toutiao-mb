<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- form表单 -->
    <!-- 表单验证:给vanField配置rules验证规则 当表单提交的时候会自动触发 如果通过会触发submit事件 失败不会提交 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        type="number"
        maxlength="11"
        :rules="rules.mobile"
      >
        <i class="iconfont icon-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="rules.code"
        type="number"
        maxlength="6"
      >
        <i class="iconfont icon-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            :time="1000 * 10"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" round block type="info">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      rules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'OnBlur' },
          { pattern: /1[3|5|7|8]\d{9}/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      // 2.表单验证
      // 在组件中必须使用this.$toastlaidiaoyToast组件
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间如果为0持续展示
      })
      // 3.调用接口发请求
      try {
        const result = await login(this.user)
        console.log('登陆成功', result)
        this.$toast.success('登录成功!')
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
      // 4.根据响应结果处理后续请求
    },
    // 发送验证码
    async onSendSms () {
      // 1.校验手机号码
      try {
        await this.$refs.loginForm.validate('mobile')
        // 2.验证通过显示倒计时
        this.isCountDownShow = true
        // 3.请求发送验证码
      } catch (error) {
        console.log('验证失败', error)
      }
    }
  }
}
</script>

<style lang="less">
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 50px;
    line-height: 50px;
    font-size: 10px;
    color: #666;
    background-color: #ededed;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
