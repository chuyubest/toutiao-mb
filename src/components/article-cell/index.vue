<template>
<!-- cell单元格的to属性和router-link导航组件功能一样 -->
  <van-cell  class="article-item" 
   :to="{
    name:'article',
    params:{articleId:article.art_id}
   }"
    >
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title  }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
          <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
            <van-image class="cover-item-image" :src="img" fit="cover" />
          </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }} </span>
        <span>{{ article.comm_count }}评价 </span>
        <span>{{ article.pubdate |relativeTime }}</span>
      </div>
    </div>
      <van-image
        slot="default"
        class="right-cover"
        fit="cover"
        v-if="article.cover.type === 1"
        :src="article.cover.images[0]"
      />
  </van-cell>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
  }
  .cover-wrap {
    display: flex;
    margin:30px 0;
    .cover-item{
        flex:1;
        height: 146px;
        &:not(:last-child){
            padding-right: 4px;
        }
     .cover-item-image {
      width: 100%;
      height: 146px;
    }
    }
    
  }
}
</style>