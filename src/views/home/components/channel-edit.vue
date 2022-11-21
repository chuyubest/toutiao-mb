<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        slot="default"
      >
        编辑
      </van-button>
    </van-cell>
    <!-- 宫格菜单 我的频道 -->
    <van-grid class="my-channel" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in myChannels"
        :key="channel.id"
        icon="clear"
      >
      <!-- v-bind:class
            一个对象:key表示要作用的css类名
            value:一个返回布尔值额表达式
            true:使用该类名
            false:不使用
       -->
      <span slot="text" class="text" :class="{active:index===activeIndex}">{{channel.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- 宫格菜单 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" direction="horizontal">
      <van-grid-item
        class="grid-item"
        v-for="recommendChannel in recommendList"
        icon="plus"
        :key="recommendChannel.id"
        :text="recommendChannel.name"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {getAllChannels} from '@/api/channel'
export default {
  name: "ChannelEdit",
  props: {
    myChannels: {
      type: Array,
      required:true
    },
    activeIndex:{
        type:Number,
        required:true
    }
  },
  data(){
    return {
        allChannels:[]
    }
  },
  created(){
    this.getAllChannels()
  },
  computed:{
     //推荐频道列表为全部频道列表-我的频道
     recommendList(){
        return this.allChannels.filter(channel=>{
            return !this.myChannels.find(myChannel=>{
                return channel.id === myChannel.id
            })
        })
     }
  },
  methods:{
    async getAllChannels(){
    const {channels} =   await getAllChannels()
    this.allChannels = channels
    console.log(channels);
    },
  }
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    font-size: 26px;
    width: 104px;
    height: 48px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .grid-item {
    width: 160px;
    height: 86px;
    /deep/.van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,.text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color:red
      }
      .van-grid-item__icon {
        font-size: 28px;
      }
      .van-icon-clear {
        position: absolute;
        right: -5px;
        top: -5px;
        color: #cacaca;
        z-index: 3;
      }
    }
  }
}
</style>