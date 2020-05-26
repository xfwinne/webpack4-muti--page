

## 1.1 架构形式

主要采用 `webpack4 + jq + bootstrap4 ` 技术栈 （可以引入其他框架，可能需要修改webpack配置）。

## 1.2 环境搭建

- npm install  &emsp;&emsp;&emsp;  // 安装 `node_modules` , 载入相关依赖；

- npm run dev  &emsp;&emsp;  // 运行本地环境；`访问页面需要网页地址栏进入/pages目录中`

- npm run build	 &emsp;&emsp;  // 打包好生产环境代码，并打开文件划分分析图（如果不想生成分析图，就去掉分析插件相关的配置）

- npm run bundle-report  &emsp;&emsp; // 在浏览器自动打开拆分包分析图(运行命令`npm run build`之后才能使用这个分析包)

- npm run lint  &emsp;&emsp;  // 校验js是否通过eslint校验

- npm run fix  &emsp;&emsp;  // 自动修复js代码符合eslint规范，有局限性

## 1.3 文件概述

- 文件情况（build目录，webpack的配置文件）：

  - `webpack.base.js`：webpack公共配置文件

  - `webpack.dev.js`：webpack开发环境特有配置文件

  - `webpack.prod.js`：webpack生产环境特有配置文件

- 文件情况（src目录，开发目录）：

  - `fonts/`：字体图标目录

  - `images/`：项目图片目录，压缩后再放这里，推荐压缩网址：https://tinypng.com/

  - `js/`：js目录，支持es6所有语法

  - `pages/`：html页面

  - `styles/`：样式目录，支持css和sass

  - `utils/`：js工具目录

  - `favicon.ico`：浏览器地址栏图标

## 1.4 代码规范

-  `目录及文件命名`：

	均使用小写字母，多个单词用中划线分隔（除了js文件外，js文件使用驼峰命名）

-  `代码书写规范` ： 

	js变量名使用驼峰式；
	css类名使用小写字母，多个单词使用中划线分隔；
	代码书写遵守eslint规范，使用airbnb规范库；

-  `js的import路径引入规范` ： 

	脚手架默认配置了@路径别名指向src目录，所以在import引入多层级路径时，直接使用@，如下：
	`import "@/styles/home.scss";`
	`import { fn } from "@/utils/tools";`

## 1.4 其他重要说明

**1、webpack配置这个多页面的入口文件是动态生成的**

  在`src/pages/`目录中的新建的页面如果`需要引入js`的话，一定要在`src/js/`中新建个`同名`的js文件。
  在`src/pages/`目录中的新建的页面如果`不需要引入js`的话，就不用在`src/js/`中新建js文件。

**2、vscode对js代码自动检测是否符合eslint规范**

  需要在vscode安装了ESlint插件
