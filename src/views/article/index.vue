<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="detail.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ detail.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="detail.aut_photo"
          />
          <div slot="title" class="user-name">{{ detail.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ detail.pubdate | relativeTime }}
          </div>
          <!-- <van-button
            v-if="!detail.is_followed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading='followLoading'
            @click="onFollow"
            >关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            round
            :loading='followLoading'
            size="small"
            @click="onFollow"
          >已关注</van-button> -->
          <!-- 当我们使用子组件的时候 传递的数据既要使用又要修改 可以使用v-model -->
          <Concern
            class="follow-btn"
            :userId="detail.aut_id"
            :isFollowed="detail.is_followed"
            @updateConcern="detail.is_followed = $event"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          ref="article-content"
          v-html="detail.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <CommentList :source="detail.art_id"/>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
          <CollectArticle
            v-model="detail.is_collected"
            :artId="detail.art_id"
          />
          <LikeArticle :articleId="detail.art_id" :attitude="detail.attitude"/>
          <van-icon name="share-o" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errorStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
// 引入文章正文样式
import { getArticleDetailById } from "@/api/article";
import { ImagePreview } from "vant";
import Concern from "@/components/concern";
import CollectArticle from "@/components/collect-article";
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list.vue'
export default {
  name: "Article",
  data() {
    return {
      detail: {}, //文章详情
      loading: true, //控制加载状态
      errorStatus: 0, //控制加载失败内容的显示
      followLoading: false, //控制按钮的加载状态
      totalCommentCount:0,//评论数量
    };
  },
  components: {
    Concern,
    CollectArticle,
    LikeArticle,
    CommentList
  },
  props: {
    articleId: {
      type: [String, Number],
      required: true,
    },
  },
  created() {
    this.getArticleDetailById();
  },
  methods: {
    async getArticleDetailById() {
      try {
        const result = await getArticleDetailById(this.articleId);
        this.detail = result;
        // 获取所有img节点
        //此时获取不到 因为数据驱动视图不是立即的可使用$nextTick
        this.$nextTick(() => {
          this.loadImage();
        });
      } catch (error) {
        if (error.response.status === 404) {
          this.errorStatus = 404;
        }
        console.log("获取失败", error);
      }
      //无论发送请求是否成功都要关闭loading
      this.loading = false;
    },
    loadImage() {
      const container = this.$refs["article-content"];
      const imgs = container.querySelectorAll("img");
      const imgsSrc = [];
      imgs.forEach((img, index) => {
        imgsSrc.push(img.src);
        //为每个图片都添加一个点击事件
        img.addEventListener("click", () => {
          ImagePreview({
            images: imgsSrc,
            startPosition: index, //默认从第一张开始
            closeable: true,
          });
        });
      });
    },
    //关注与取消关注用户
    //  async onFollow(){
    //    this.followLoading = true
    //    try{
    //       if(this.detail.is_followed){//已关注的话,就取消关注
    //          await cancelFollow(this.detail.aut_id)
    //       }else{
    //          await addFollow(this.detail.aut_id)
    //       }
    //       // 更新视图状态
    //        this.detail.is_followed=!this.detail.is_followed
    //    }catch(error){
    //       if(error.response.status === 400){
    //       this.$toast('不能关注自己')
    //       }
    //       this.$toast('操作失败,请重试!')
    //    }
    //    this.followLoading = false
    //  }
  },
};
</script>

<style scoped lang="less">
@import url("./github-markdown.css");
.article-container {
  /deep/ .van-nav-bar .van-icon {
    color: #fff;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>