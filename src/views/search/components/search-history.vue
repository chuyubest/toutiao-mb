<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$parent.searchHistory  = []">全部删除</span>
        &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isDeleteShow = true"/>
    </van-cell>
    <van-cell
      :title="search"
      v-for="(search, index) in searchHistory"
      :key="index"
      @click="updateHistory(search,index)"
    >
      <van-icon name="close" v-show="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    searchHistory: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false, //控制删除显示状态
    };
  },
  methods:{
    updateHistory(search,index){
      if(this.isDeleteShow){//删除历史记录
        //通知父组件修改searchHistory
        this.$parent.searchHistory.splice(index,1)
      }else{//显示搜索结果
        this.$emit('search',search)
      }
    }
  }
};
</script>

<style>
</style>