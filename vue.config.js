const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {
    proxy: {
      // 当地址中包含 /api的时候,触发此代理
      "/api": {
        target: "https://api.imooc-admin.lgdsunday.club",
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    // 处理node path 引发的问题
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
      },
    },
  },

  chainWebpack(config) {
    // 设置 svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
