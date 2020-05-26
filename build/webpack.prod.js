const merge = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 分离css
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除目录
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); // 文件拆分分析图插件
const baseConfig = require("./webpack.base");


module.exports = merge({
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    // filename: `js/[name].js`
    filename: `js/[name]_[chunkhash:8].js`
  },
  performance: {
    hints: "warning"
  },
  // devtool: 'source-map',
  // 插件
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // filename: `css/[name].css`
      filename: `css/[name]-[contenthash:8].css`
    }),
    // new OptimizeCssAssetsPlugin(),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        map: {
          // 不生成内联映射,这样配置就会生成一个source-map文件
          inline: false,
          // 向css文件添加source-map路径注释
          // 如果没有此项压缩后的css会去除source-map路径注释
          annotation: true
        }
      }
    }),
    new BundleAnalyzerPlugin( // 生成拆分打包图
      {
        analyzerMode: "disabled",
        generateStatsFile: true,
        statsOptions: {
          source: false
        }
      }
    )
  ]
}, baseConfig);
