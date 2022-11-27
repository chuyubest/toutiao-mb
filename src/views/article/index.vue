<template>
 <div class="article-detail">
    文章详情页
 </div>
</template>

<script>
export default {
   name:'Article',
   props:{
      articleId:{
         type:[String,Number],
         required:true
      }
   }
}
</script>

<style>

</style>