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
      />
    </form>
    <!-- 三部分:搜索历史记录 -->
    <SearchHistory />
    <!-- 联想建议 -->
    <Suggestion />
    <!-- 搜索结果 -->
    <SearchResult></SearchResult>
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
    };
  },
  components: {
    SearchResult,
    Suggestion,
    SearchHistory
  },
  methods: {
    onSearch(val) {
      console.log(val);
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