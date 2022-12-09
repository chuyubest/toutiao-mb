<template>
  <div class="update-photo">
    <img class="img" :src="imgUrl" alt="" ref="image" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import { updatePhoto } from "@/api/user";
import Cropper from "cropperjs";
export default {
  name: "UpdateImage",
  data() {
    return {
      cropper: null,
    };
  },
  props: {
    imgUrl: {
      type: [Object, String],
      required: true,
    },
  },
  mounted() {
    const image = this.$refs.image;
    this.cropper = new Cropper(image, {
      viewMode: 1, //查看模式
      dragMode: "move",
      aspectRatio: 1, //比例
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
  methods: {
    //点击完成 修改头像
    onConfirm() {
      // 调用cropper的getCroppedCanvas()方法
      //得到一个blob对象 里面为一个file图像的对象
      this.cropper.getCroppedCanvas().toBlob( (blob) => {
        this.updatePhoto(blob)
      });
    },
    async updatePhoto(blob) {
      try {
        this.$toast.loading({
            message:'保存中...',
            duration:0,
            forbidClick:true
        })
        // Content-Type	multipart/form-data 后端需要表单类型的数据
        const formData = new FormData();
        formData.append("photo", blob);
        // 发送请求
        const { photo } = await updatePhoto(formData);
        //关闭弹层
        this.$emit("close");
        this.$toast('修改成功')
        //修改视图
        this.$emit("update-photo", photo);
      } catch (error) {
        this.$toast('修改失败,请稍后重试')
      }
    },
  },
};
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 90px;
      height: 90px;
      color: #fff;
      font-size: 30px;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>