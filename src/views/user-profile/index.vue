<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell title="头像" is-link>
      <van-image round class="avator" fit="cover" :src="userProfile.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="userProfile.name"
      is-link
      @click="isNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      :value="sex"
      is-link
      @click="isGenderShow = true"
    ></van-cell>
    <van-cell title="生日" 
    :value="userProfile.birthday" 
    is-link @click="isBirthdayShow = true"
    ></van-cell>
    <!-- 修改昵称 -->
    <van-popup v-model="isNameShow" style="height: 100%" position="bottom">
      <UpdateName
        v-if="isNameShow"
        @close="isNameShow = false"
        v-model="userProfile.name"
      />
    </van-popup>
    <!-- 修改性别 -->
    <van-popup v-model="isGenderShow" position="bottom">
      <UpdateGender
        v-if="isGenderShow"
        @close="isGenderShow = false"
        v-model="userProfile.gender"
      />
    </van-popup>
    <!-- 修改生日 -->
    <van-popup v-model="isBirthdayShow" position="bottom">
      <UpdateBirthday
        v-if="isBirthdayShow"
        @close="isBirthdayShow = false"
        v-model="userProfile.birthday"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdateName from "./components/update-name.vue";
import UpdateGender from "./components/update-gender.vue";
import UpdateBirthday from "./components/update-birthday.vue";
import { getUserProfile } from "@/api/user";
export default {
  name: "UserProfile",
  data() {
    return {
      userProfile: {}, //用户个人信息
      isNameShow: false, //控制修改昵称弹出层
      isGenderShow: false, //控制修改性别弹出层
      isBirthdayShow:false,//控制修改生日弹层
    };
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
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
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>