<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 底部标签页 -->
    <!-- route开启路由模式 -->
    <van-tabbar  route>
      <van-tabbar-item to="/home">
        <i class="iconfont icon-shouye" slot="icon"></i>
        <span>首页</span>
    </van-tabbar-item>
    <van-tabbar-item to="/question">
        <i class="iconfont icon-wenda" slot="icon"></i>
        <span>问答</span>
    </van-tabbar-item>
    <van-tabbar-item to="/video">
        <i class="iconfont icon-shipin" slot="icon"></i>
        <span>视频</span>
    </van-tabbar-item>
    <van-tabbar-item to="/my">
        <i class="iconfont icon-wode" slot="icon"></i>
        <span>{{$store.state.user ?'我的':'未登录'}}</span>
    </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout'

}
</script>

<style lang="less">
.layout-container {
    .iconfont{
        font-size: 30px;
    }
}
</style>
