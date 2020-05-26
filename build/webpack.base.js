// const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TransferWebpackPlugin = require("transfer-webpack-plugin");
const autoprefixer = require("autoprefixer");
// const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除目录

/**
 * 封装获取入口对象；获取html模板名
 * @param {Array} arr glob.sync()获取的路径地址
 * @param {String} ext 文件后缀名
 */
function getNameArr(arr, ext) {
  const entryObj = {
  };
  const htmlNameArr = [];
  arr.forEach((pathName) => {
    const start = pathName.indexOf("src/") + 4;
    const end = pathName.length - ext.length;
    const eArr = [];
    const name = pathName.slice(start, end);
    const newName = name.split("/")[1];
    htmlNameArr.push(newName);
    eArr.push(pathName);
    eArr.push("babel-polyfill");
    entryObj[newName] = eArr;
  });
  if (ext === ".js") {
    return entryObj;
  } else {
    return htmlNameArr;
  }
}

// 获取到动态入口文件对象
const getEntryObject = getNameArr(glob.sync("./src/js/**/*.js"), ".js");

/**
 * 获取html-webpack-plugin配置项参数
 * @param {String} name 要做为html模板的文件名
 * @param {String} chunks html模板的入口js文件名
 */
const getHtmlConfig = (name, chunks) => ({
  template: `./src/pages/${name}.html`,
  filename: `pages/${name}.html`,
  inject: "body",
  hash: false,
  chunks,
  favicon: "./src/favicon.ico"
});

// 动态生成html中的plugins
function getHtmlPlugins() {
  // 配置页面
  const entryNameArr = Object.keys(getEntryObject);
  const htmlNameArr = getNameArr(glob.sync("./src/pages/**/*.html"), ".html");
  const htmlPluginConfig = [];
  htmlNameArr.forEach((element) => {
    if (entryNameArr.includes(element)) {
      htmlPluginConfig.push({
        htmlName: element,
        title: "",
        chunks: [element]
      });
    } else {
      htmlPluginConfig.push({
        htmlName: element,
        title: "",
        chunks: []
      });
    }
  });
  // 遍历生成完整的html模板数组
  const htmlPlugins = [];
  htmlPluginConfig.forEach((element) => {
    htmlPlugins.push(new HtmlWebpackPlugin(getHtmlConfig(element.htmlName, element.chunks)));
  });
  return htmlPlugins;
}

// 获取到了动态生成的html模板plugins
const htmlPlugins = getHtmlPlugins();


module.exports = {
  entry: getEntryObject,
  resolve: {
    // 定义路径别名（alias）
    alias: {
      "@": path.resolve(__dirname, "../src")
    },
    // 指定extensions之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配
    extensions: [".js", ".scss", ".css"]
  },
  devtool: "source-map", // 为了让开发环境和生产环境的css都能找到对应行，所以都设置为这个，虽然打包速度慢了点
  module: {
    // noParse: /jquery|popper|bootstrap|echarts/, // 不解析模块中的依赖关系 提高打包效率
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: /src/,
        use: ["babel-loader"]
        // use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(sc|c)ss$/,
        // css分离写法
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer()
              ]
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              // limit:5000
              name: "images/[name].[ext]",
              limit: 10240 // size <= 10kb 就转化为base64位
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // new CleanWebpackPlugin(),
    ...htmlPlugins,
    // 自动加载模块，而不必到处 import 或 require;任何时候，当 使用的变量 被当作未赋值的变量时，module 就会自动被加载
    // new webpack.ProvidePlugin({ // 因为配置了eslint规范，所以不需要这个配置了
    //   $: "jquery",
    //   jQuery: "jquery",
    //   jquery: "jquery",
    //   "window.jQuery": "jquery"
    // }),
    // 把src/images目录下的文件copy到dist/images目录下
    new TransferWebpackPlugin([
      {
        from: "images",
        to: "images"
      }
    ], path.resolve(__dirname, "../src"))
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: { // 提取基本库
          name: "vendors", // 提取出来的文件命名
          test: /(jquery|popper|bootstrap)/, // 匹配提取规则
          // test: /[\\/]node_modules[\\/](jquery|popper|bootstrap)/,
          chunks: "all",
          minChunks: 2,
          priority: 10, // 分割优先级，数值越大，分割优先级越高（html中动态引入js也越靠前）
          minSize: 0 // 生成块的最小大小（以字节为单位）
        },
        common: { // 其余加载包（提取公共部分包括css和js）
          name: "common",
          // test: /[\\/]src/,
          chunks: "all",
          minChunks: 2, // 拆分前必须共享模块的最小块数
          priority: 9,
          minSize: 0
        }
        // public: { // 提取公共css
        //   name: "public",
        //   // test: /\.(sc|c)ss$/,
        //   test: /[\\/]src[\\/]styles/,
        //   chunks: "all",
        //   priority: 11,
        //   minChunks: 2,
        //   minSize: 0
        // }
      }
    }
  }
};
