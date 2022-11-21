<template>
  <div class="channel-edit">
    <van-cell>
      <div slot="title">我的频道</div>
      <van-button type="danger" plain round size="mini" slot="default">
        编辑
      </van-button>
    </van-cell>
    <!-- 宫格菜单 我的频道 -->
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
     <!-- 宫格菜单 频道推荐 -->
      <van-cell>
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "ChannelEdit",
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
}
</style>