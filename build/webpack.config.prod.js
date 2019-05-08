
const webpackMerge = require("webpack-merge");

const baseConfg = require("./webpack.config.base");

const CleanWebpackPlugin = require("clean-webpack-plugin");

//https://www.npmjs.com/package/mini-css-extract-plugin 优化-压缩代码
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const path = require("path");

module.exports = webpackMerge(baseConfg,{
    mode: "production",
    performance: { 
        hints: false 
    },
    devtool: "cheap-module-source-map",// 原始代码（只有行内）每行代码从loader中进行映射
    plugins: [
        new CleanWebpackPlugin(["dist"], { 
            root: path.resolve(__dirname, ".."),
            dry: false // 启用删除文件
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true, //启用缓存并且启用多进程并行运行
                sourceMap: true,  //错误消息位置映射(减慢编译速度)，线上错误调试方便
                uglifyOptions: {
                    compress: false
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
});