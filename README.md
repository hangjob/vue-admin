# 一份完整的vue-cli3项目基础配置项

### 网站例子

[vipbic是一个专注前端开发、网址导航、社区讨论综合网站](https://www.vipbic.com/)

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

### 项目配置功能
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
14. 拷贝文件
15. 添加可选链运算符
16. 配置px转换rem

### 附加功能
1. vue如何刷新当前页面

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
<% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.css) { %>
    <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="preload" as="style" />
    <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet" />
<% } %>

<% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
    <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
<% } %>

```
```js
// cdn预加载使用
const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter'
}
const cdn = {
    // 开发环境
    dev: {
        css: [
            'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
        ],
        js: []
    },
    // 生产环境
    build: {
        css: [
            'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
        ],
        js: [
            'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
            'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js'
        ]
    }
}
chainWebpack: config => {
    config.plugin('html').tap(args => {
        if (process.env.NODE_ENV === 'production') {
            args[0].cdn = cdn.build
        }
        if (process.env.NODE_ENV === 'development') {
            args[0].cdn = cdn.dev
        }
        return args
    })
}
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
如果还没看懂的客官请移步[在vscode中使用别名@按住ctrl也能跳转对应路径](https://www.vipbic.com/thread.html?id=88)

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

### 拷贝文件
安装`npm i copy-webpack-plugin -D`
```js
const CopyWebpackPlugin = require('copy-webpack-plugin');
configureWebpack: config => {
    const plugins = [];
     plugins.push(
        new CopyWebpackPlugin([{ from: './NLwdLAxhwv.txt'}])
    )
}
```
from为文件的路径，还有一个to属性是输出的文件夹路径，不写则默认复制到打包后文件的根目录

### 可选链运算符
安装依赖
```js
cnpm install  @babel/plugin-proposal-optional-chaining -S
```
在babel.config.js中  的 plugins中添加 "@babel/plugin-proposal-optional-chaining"
```js
module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        '@babel/plugin-proposal-optional-chaining'
    ]
}
```
测试
```js
    const obj = {
        foo: {
            bar: {
                baz: 42,
                fun: () => {
                    return 666;
                }
            }
        }
    };
    let baz = obj?.foo?.bar?.baz;
    let fun = obj?.foo?.bar?.fun();
    console.log(baz); // 42
    console.log(fun) // 666
```

### 配置px转换rem
安装
```js
cnpm i lib-flexible -S
cnpm i postcss-pxtorem -D
```
入口js
```js
import 'lib-flexible/flexible.js'
```
如果不需要转rem，注释即可，也不要引入flexible.js
```js
css: {
    loaderOptions: {
        postcss: {
            plugins: [
                require('postcss-pxtorem')({
                    rootValue : 75, // 换算的基数 1rem = 75px 这个是根据750px设计稿来的，如果是620 的就写 62
                    // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用selectorBlackList字段，来过滤
                    //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
                    selectorBlackList  : ['weui','mu'], //
                    propList : ['*'], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
                })
            ]
        }
    }
}
```



### vue如何刷新当前页面
刷新当前页面适合在只改变了路由的id的页面，比如查看详情页面，当路由id发生时候，并不会去触发当前页面的钩子函数
查看`App.vue`
```js
<template>
	<div class="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>
export default {
	name: "App",
	provide() {
		return {
			reload: this.reload
		};
	},
	data() {
		return {
			isRouterAlive: true
		};
	},
	methods: {
        // 重载页面 适合添加数据或者路由id改变
		reload() {
			this.isRouterAlive = false;
			this.$nextTick(()=>{
                this.isRouterAlive = true;
            });
		}
	}
};
</script>
```
然后其它任何想刷新自己的路由页面，都可以这样: `this.reload()`

### 如有疑问
可以加群一起讨论关于vue-cli打包编译的见解，你的一个小小的改动就是一个大的进步
![vue.config.js交流圈](https://i.loli.net/2020/05/09/Io6cJahlkR7ZtqM.jpg)