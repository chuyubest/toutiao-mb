<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败,请重试"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "SearchResult",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, //当前页码
      error:false,//控制加载失败的提示
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      //1.请求获取数据
      try {
        const { results } = await getSearchResult({
          q: this.searchText,
          page: this.page, //当前页码
          per_page: 20, //每页数据量
        });
        //测试失败情况
        // if(Math.random()>0.5){
        //     JSON.parse('sss')
        // }
        //2.将数据添加到数组列表中
        this.list.push(...results);
        //3.将本次加载的loading关闭
        this.loading = false;
        //4.判断是否还有数据,如果有,则更新页码获取更多数据;没有的话,将finish设为true
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
  },
};
</script>

<style>
</style>