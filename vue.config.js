const multiple = require("./pages.js");
// "build": "vue-cli-service build --mode test", 修改打包命令
// https://suyi123.com/2018/11/01/vue-cli-3-%E5%A4%9A%E9%A1%B5%E5%BA%94%E7%94%A8%E4%B8%8E%E5%88%86%E5%8C%85/ 分包加载
const path = require('path');
const isProd = process.env.NODE_ENV

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    pages: multiple,
    publicPath: isProd === 'development' ? './' : '',
    lintOnSave: false, //如果你不需要使用eslint，把lintOnSave设为false即可
    productionSourceMap: false, //设为false打包时不生成.map文件
    // 打包时用第三方cdn
    configureWebpack: config => {
        if (isProd) {
            config.externals = {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                vuex: 'Vuex',
            }
        }
    },
    // 文件别名
    chainWebpack: config => {
        config.resolve.alias
            .set('@',resolve('src'))
    },
    // 引入全局less
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [resolve('src/style/admin.less')] 
      }
    },
    // 设置请求代理
    devServer: {
        historyApiFallback: true,
        // hot: true,
        host: '127.0.0.1',
        port: 9019,
        inline: true,
        stats: { colors: true },
        proxy: {
            //匹配代理的url
            '/api': {
            // 目标服务器地址
              target: 'http://www.vipbic3.com/api/',
              //路径重写
              pathRewrite: {'^/api' : ''},
              changeOrigin: true
            }
         }
    }
}