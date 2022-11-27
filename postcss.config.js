// postcss的配置文件 基于nodejs编写
module.exports = {
  plugins: {
    // 配置使用autopredixer插件
    // 生成浏览器css样式规则前缀
    // VUE-CLI已经配置了一次 这里又配置了产生了冲突
    // 'autoprefixer':{
    //   browsers:['Android>=4.0','iOS>=8']
    // },

    // 配置使用postcss-pxtorem
    'postcss-pxtorem': {
      // lib-flexible的rem适配方案,将一行分为10份所以rootValue应该设计为设计稿宽度的十分之一
      // 我们的设计稿为750,所以应该设置为750/10=75
      // vant建议设置为37.5 因为vant是基于375写的
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // rootValue: 37.5,//html元素的字体大小
      propList: ['*'],// 配置要转换的css属性
      //配置不要转换的样式资源
      exclude:'github-markdown'
    }
  }
}
