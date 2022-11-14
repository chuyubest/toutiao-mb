module.exports = {
  productionSourceMap: false,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  // 配置代理跨域
  devServer: {
    proxy: {
      '/v1_0': {
        target: 'http://geek.itheima.net'
      }
    }
  }
}
