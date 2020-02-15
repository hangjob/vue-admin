/*
 * @Author: your name
 * @Date: 2019-10-10 21:18:32
 * @LastEditTime : 2020-02-11 17:30:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\vue.config.js
 */
const multiple = require("./pages.js");

const path = require('path');
const isProd = process.env.NODE_ENV

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    pages: multiple,
    publicPath: isProd === 'development' ? './' : '',
    lintOnSave: false, //如果你不需要使用eslint，把lintOnSave设为false即可
    productionSourceMap: false, //设为false打包时不生成.map文件
    // 打包时用第三方cdn
    configureWebpack: config => {
        if (isProd === 'production') {
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
            .set('@', resolve('src'))
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
                pathRewrite: { '^/api': '' },
                changeOrigin: true
            }
        }
    }
}