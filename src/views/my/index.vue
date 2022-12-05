<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            round
            class="avatar"
            fit="cover"
            :src="userInfo.photo"
          />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile">编辑资料</van-button>
        </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录头部 -->
    <div v-else class="header not-login" @click="$router.push('/login')">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录/注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell class="news-inform" title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      v-if="user"
      clickable
      class="logout-btn"
      title="退出登录"
      @click="logout"
    />
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  data () {
    return {
      userInfo: null
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) { // 用户登陆了才请求
      this.getUserInfo()
    }
  },
  methods: {
    logout () {
      // 弹窗提示用户是否要退出
      this.$dialog
        .confirm({ title: '您确定要退出登录?' })
        .then(() => {
          // 点击确认按钮
          // 清除用户的登陆状态
          // 清除token以及本地存储的token
          this.$store.commit('removeUser')
        })
        .catch()
    },
    async getUserInfo () {
      try {
        const result = await getUserInfo()
        this.userInfo = result
        console.log(result)
      } catch (error) {
        this.$toast('获取数据失败,请稍后再试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 361px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 28px;
      color: #fff;
    }
  }
}
.user-info {
  .base-info {
    box-sizing: border-box;
    height: 231px;
    padding: 76px 32px 23px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        margin-right: 23px;
        border: 3px solid #fff;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .data-status {
    display: flex;
    .data-item {
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: #fff;
      flex: 1;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
}
.grid-nav {
  .grid-item {
    height: 141px;
    i.iconfont {
      font-size: 45px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
    span {
      font-size: 28px;
    }
  }
}
.logout-btn {
  margin-top: 5px;
  color: #eb5253;
  text-align: center;
}
.news-inform {
  margin-top: 10px;
}
</style>
