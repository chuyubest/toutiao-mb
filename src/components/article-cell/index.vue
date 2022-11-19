<template>
  <van-cell class="article-item">
    <div slot="title" class="title">{{ article.title }}</div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div class="cover-item">
          <van-image
            width="100"
            height="100"
            v-for="(img, index) in article.cover.images"
            :key="index"
            :src="img"
          />
        </div>
      </div>
      <span>{{ article.aut_name }} </span>
      <span>{{ article.comm_count }}评价 </span>
      <span>{{ article.pubdate }}</span>
    </div>
    <div>
      <van-image
        width="100"
        height="100"
        slot="default"
        v-if="article.cover.type === 1"
        :src="article.cover.images[0]"
      />
    </div>
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

<style>
</style>