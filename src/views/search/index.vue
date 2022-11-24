<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form action="/">
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
    <Suggestion v-else-if="searchText" :searchText="searchText" @search="onSearch"/>
    <!-- 三部分:搜索历史记录 -->
    <SearchHistory v-else/>


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
      isResultShow:false
    };
  },
  components: {
    SearchResult,
    Suggestion,
    SearchHistory
  },
  methods: {
    onSearch(val) {
      this.searchText = val
      console.log(val);
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>