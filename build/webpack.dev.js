const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const os = require("os"); // nodejs模块，帮助我们获取本机ip
const baseConfig = require("./webpack.base");


// 随机端口号
const randomPort = parseInt(Math.random() * 1000 + 8000);

// 获取本机ip
function getIPAdress() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "localhost";
}
const host = getIPAdress();

module.exports = merge({
  mode: "development",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: `js/[name].js`
  },
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"), // 告诉服务器从哪个目录中提供内容，最好设置成绝对路径
    // historyApiFallback: false,
    hot: true,
    // inline: true,
    // stats: 'errors-only',
    host,
    // port: 8787,
    port: randomPort,
    overlay: true,
    open: true
  },
  // devtool: 'cheap-module-eval-source-map',
  // devtool: 'source-map',
  performance: {
    hints: false
  },
  // 插件
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].css`
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}, baseConfig);
