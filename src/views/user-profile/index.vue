<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="router.back()"
    />
    <van-cell title="头像" is-link>
      <van-image round class="avator" fit="cover" :src="userProfile.photo" />
    </van-cell>
    <van-cell title="昵称" :value="userProfile.name" is-link></van-cell>
    <van-cell title="性别" :value="sex" is-link></van-cell>
    <van-cell title="生日" :value="userProfile.birthday" is-link></van-cell>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
export default {
  name: "UserProfile",
  data() {
    return {
      userProfile: {}, //用户个人信息
    };
  },
  created() {
    this.getUserProfile();
  },
  computed: {
    sex() {
      return this.userProfile.gender === 0 ? "男" : "女";
    },
  },
  methods: {
    async getUserProfile() {
      try {
        const result = await getUserProfile();
        this.userProfile = result;
      } catch (error) {
        this.$toast("数据获取失败");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.user-profile {
  /deep/ .van-nav-bar .van-icon {
    color: #fff;
  }
  .avator {
    width: 60px;
    height: 60px;
  }
}
</style>