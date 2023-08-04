module.exports = {
  publicPath: process.env.NODE_ENV === "production" ?
    "/airplane" /*'/production-sub-path/'*/ :
    "/",

  productionSourceMap: false,

  css: {
    loaderOptions: {
      scss: {
        data: `@import "~@/css/mixin.scss";`
      },
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
          require('postcss-nested')
        ]
      }
    }
  },

  configureWebpack: {
    devtool: "source-map"
  },

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch-index");
    config.plugins.delete("preload-index");

    config.plugins.delete("prefetch-login");
    config.plugins.delete("preload-login");
  }
};