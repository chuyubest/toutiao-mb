<template>
  <div id="app">
    <router-view/>
    黑马头条
    <i class="iconfont icon-yanzhengma"></i>
    <van-button type="info">信息按钮</van-button>
    <div class="box"></div>

  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
  .box {
    width: 200px;
    height: 200px;
    background-color: pink;
  }
</style>
