# 一份完整的vue-cli3项目基础配置项

## 安装依赖
```
cnpm install
```

### 开发模式
```
npm run dev
```

### 打包测试环境
```
npm run test
```

### 测试和生产一起打包
```
npm run publish
```

### 打包生产环境
```
npm run build
```

### 包含功能
1. 配置全局cdn，包含js、css
2. 开启Gzip压缩，包含文件js、css
3. 去掉注释、去掉console.log
4. 压缩图片
5. 本地代理
6. 设置别名，vscode也能识别
7. 配置环境变量开发模式、测试模式、生产模式
8. 请求路由动态添加
9. axios配置
10. 添加mock数据
11. 配置全局less
12. 只打包改变的文件
13. 开启分析打包日志

### 目录结构
```shell
├── public                      静态模板资源文件
├── src                         项目文件
├──|── assets                   静态文件 img 、css 、js    
├──|── components               全局组件
├──|── http                     请求配置
├──|── layout                   布局文件
├──|── mock                     测试数据
├──|── modules                  放置动态是添加路由的页面
├──|── router                   路由
├──|── store                    vuex数据管理
├──|── utils                    工具文件
├──|── view                     页面文件
├──|── App.vue                  
├──|── main.js                  
├── .env.development            开发模式配置
├── .env.production             正式发布模式配置
├── .env.test                   测试模式配置
├── entrance.js                 入口文件
├── vue.config.js               config配置文件
```

### html模板配置cdn
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <% for (var i in
        htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.css) { %>
    <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="preload" as="style" />
    <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet" />
    <% } %>
</head>

<body>
    <noscript>
        <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
            Please enable it to continue.</strong>
    </noscript>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <% for (var i in
        htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
    <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
</body>
</html>
```

### 开启Gzip压缩，包含文件js、css
```js
new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.(js|css)$/, // 匹配文件名
      threshold: 10000, // 对超过10k的数据压缩
      deleteOriginalAssets: false, // 不删除源文件
      minRatio: 0.8 // 压缩比
})
```
### 去掉注释、去掉console.log
安装`cnpm i uglifyjs-webpack-plugin -D`
```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
new UglifyJsPlugin({
	uglifyOptions: {
		output: {
			comments: false, // 去掉注释
		},
		warnings: false,
		compress: {
			drop_console: true,
			drop_debugger: false,
			pure_funcs: ['console.log'] //移除console
		}
	}
})
```
### 压缩图片
```js
chainWebpack: config => {
	// 压缩图片
	config.module
		.rule('images')
		.test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
		.use('image-webpack-loader')
		.loader('image-webpack-loader')
		.options({ bypassOnDebug: true })
}
```
### 本地代理
```js
devServer: {
	open: false, // 自动启动浏览器
	host: '0.0.0.0', // localhost
	port: 6060, // 端口号
	https: false,
	hotOnly: false, // 热更新
	proxy: {
		'^/sso': {
			target: process.env.VUE_APP_SSO, // 重写路径
			ws: true, //开启WebSocket
			secure: false, // 如果是https接口，需要配置这个参数
			changeOrigin: true
		}
	}
}
```

### 设置vscode 识别别名
在vscode中插件安装栏搜索 `Path Intellisense` 插件，打开settings.json文件添加 以下代码 "@": "${workspaceRoot}/src"，安以下添加
```json
{
    "workbench.iconTheme": "material-icon-theme",
    "editor.fontSize": 16,
    "editor.detectIndentation": false,
    "guides.enabled": false,
    "workbench.colorTheme": "Monokai",
    "path-intellisense.mappings": {
        "@": "${workspaceRoot}/src"
    }
}
```
在项目package.json所在同级目录下创建文件jsconfig.json
```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "allowSyntheticDefaultImports": true,
        "baseUrl": "./",
        "paths": {
          "@/*": ["src/*"]
        }
    },
    "exclude": [
        "node_modules"
    ]
}
```
如果还没请客官移步[在vscode中使用别名@按住ctrl也能跳转对应路径](https://www.vipbic.com/thread.html?id=88)

### 配置环境变量开发模式、测试模式、生产模式
在根目录新建
#### .env.development
```js
# 开发环境
NODE_ENV='development'

VUE_APP_SSO='http://http://localhost:9080'
```
#### .env.test
```js
NODE_ENV = 'production' # 如果我们在.env.test文件中把NODE_ENV设置为test的话，那么打包出来的目录结构是有差异的
VUE_APP_MODE = 'test'
VUE_APP_SSO='http://http://localhost:9080'
outputDir = test
```
#### .env.production
```js
NODE_ENV = 'production'

VUE_APP_SSO='http://http://localhost:9080'
```
#### package.json
```json
"scripts": {
    "build": "vue-cli-service build", //生产打包
    "lint": "vue-cli-service lint",
    "dev": "vue-cli-service serve", // 开发模式
    "test": "vue-cli-service build --mode test", // 测试打包
    "publish": "vue-cli-service build && vue-cli-service build --mode test" // 测试和生产一起打包
 }
```
### 请求路由动态添加
在`router/index.js`，核心
```js
router.beforeEach((to, from, next) => {
    const { hasRoute } = store.state; // hasRoute设置一个状态，防止重复请求添加路由
    if (hasRoute) {
        next()
    } else {
        dynamicRouter(to, from, next, selfaddRoutes)
    }
})
```
如果动态添加路由抛警告，路由重复添加，需要添加 `router.matcher = new VueRouter().matcher`

### axios配置
在`http/request.js`
```js
import http from './src/http/request'
Vue.prototype.$http = http;
// 使用
this.$http.windPost('url','参数')
```

### 添加mock数据
```js
const Mock = require('mockjs')
const produceNewsData = []
Mock.mock('/mock/menu', produceNewsData)
```
Mock支持随机数据，具体参看官网列子
http://mockjs.com/examples.html 

### 配置全局less
```js
pluginOptions: {
	// 配置全局less
	'style-resources-loader': {
		preProcessor: 'less',
		patterns: [resolve('./src/style/theme.less')]
	}
}
```
### 只打包改变的文件
安装`cnpm i webpack -D`
```js
const { HashedModuleIdsPlugin } = require('webpack');
configureWebpack: config => {	
	const plugins = [];
	plugins.push(
		new HashedModuleIdsPlugin()
	)
}
```
### 开启分析打包日志
安装`cnpm i webpack-bundle-analyzer -D`
```js
chainWebpack: config => {
	config
		.plugin('webpack-bundle-analyzer')
		.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
}
```
### 如有疑问
