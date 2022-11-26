<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>
    <!-- 联想建议 -->
    <Suggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    />
    <!-- 三部分:搜索历史记录 -->
    <SearchHistory v-else :searchHistory="searchHistory"  @search="onSearch"/>
  </div>
</template>

<script>
import SearchResult from "./components/search-result.vue";
import Suggestion from "./components/suggestion.vue";
import SearchHistory from "./components/search-history.vue";
export default {
  name: "Search",
  data() {
    return {
      searchText: "",
      isResultShow: false,
      searchHistory: JSON.parse(localStorage.getItem('SEARCH_HISTORY'))|| [], //存储历史记录
    };
  },
  components: {
    SearchResult,
    Suggestion,
    SearchHistory,
  },
  watch:{
    searchHistory(newVal){
      localStorage.setItem('SEARCH_HISTORY',JSON.stringify(newVal))
    }
  },
  methods: {
    onSearch(val) {
      //更新文本框内容
      this.searchText = val;
      //存储搜索历史记录
      //要求:不要有重复历史记录
      const index = this.searchHistory.indexOf(val)
      if(index!==-1){
        this.searchHistory.splice(index,1)
      }
      this.searchHistory.unshift(val)
      //渲染搜索结果
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>