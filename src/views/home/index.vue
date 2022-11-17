<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 标签页 -->
    <!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。
    通过 animated 属性可以开启切换标签内容时的转场动画。
    通过 swipeable 属性可以开启滑动切换标签页。
    -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
      v-for="channel in channelsList"
      :title="channel.name"
      :key="channel.id"
      >
        {{channel.name}}的内容
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hanmbuger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      channelsList: []// 频道列表
    }
  },
  created () {
    this.getUserChannels()
  },
  methods: {
    async getUserChannels () {
      try {
        const result = await getUserChannels()
        console.log(result)
        this.channelsList = result.channels
      } catch (error) {
        this.$toast('获取频道列表数据失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  .van-nav-bar__title {
    max-width: unset !important;
  }
  .search-btn {
    width: 550px;
    height: 64px;
    background-color: #5babfb;
    font-size: 28px;
    border: none;
    .van-icon {
      color: #fff;
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tab__wrap {
      height: 82px;
    }
    .van-tab {
      font-size: 30px;
      min-width: 200px;
      border-right: 1px solid #edeff3;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .hanmbuger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: rgba(255, 255, 255, 0.902);
      i.iconfont {
        font-size: 33px;
      }
      &::before{
        content:'';
        position: absolute;
        left: 0;
        width:1px;
        height: 100%;
        background: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
    .placeholder{
      flex-shrink: 0;
       width: 66px;
       height: 82px;
    }
  }
}
</style>
