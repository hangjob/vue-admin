
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const multiple = require("../pages.js");

const VueLoaderPlugin = require("vue-loader/lib/plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin");

const entry = {};
const plugins = [];


// 配置生成多页面
multiple.pages.forEach((value, index) => {
    entry[value.page] = value.entry;
});

multiple.pages.forEach((value, index) => {
    plugins.push(
        new HtmlWebpackPlugin({
            template: value.template, //指向模板文件
            filename: value.filename,
            minify: {
                removeAttributeQuotes: true, //删除属性的双引号
                collapseInlineTagWhitespace: true //折叠一行
            },
            chunks: value.chunks,
            hash: true //hash 为了开发中js有缓存效果，加入hash，这样可以有效避免缓存JS
        })
    );
});



//阔以参考 https://blog.pokehome.com/iviewui%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0-%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E6%9E%84%E5%BB%BA/
const baseConfg = {
    entry:entry,
    output: {
        path : path.resolve(__dirname,"../dist"),
        filename: "js/[name]/[name].js",
        publicPath: "./", //指定路径加到静态资源路径前面
    },
    stats: {
        // 如果有 抛异常 Entrypoint mini-css-extract-plugin = *
        //https://github.com/webpack-contrib/mini-css-extract-plugin/issues/39
        entrypoints: false,
        children: false
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                use: "babel-loader?cacheDirectory", //缓存loader执行结果 发现打包速度已经明显提升了
                exclude: /node_modules/ 
            },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader",
                    options: {
                        insertAt: "top" //将style插入到顶部
                    }
                },MiniCssExtractPlugin.loader,"css-loader","postcss-loader"], //style-loader 把css插入到header标签中
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ], //style-loader 把css插入到header标签中
                exclude: /node_modules/ 
            },
            {
                // https://github.com/crlang/easy-webpack-4/blob/master/webpack.config.js 处理图片和CSS加载资源路径
                // https://segmentfault.com/q/1010000013910511 
                test: /\.(gif|jpg|png)\??.*$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        publicPath: "./images/",
                        outputPath: "images/", //输出文件目录
                        limit:8192 //大于该字节采用图片输出否则输出base64
                    }
                }]
            },
            {
                // https://github.com/crlang/easy-webpack-4/blob/master/webpack.config.js 处理图片和CSS加载资源路径
                // https://segmentfault.com/q/1010000013910511 
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        publicPath: "../../images/",
                        outputPath: "images/", //输出文件目录
                        limit:8192 //大于该字节采用图片输出否则输出base64
                    }
                }]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    plugins: plugins.concat([
        new MiniCssExtractPlugin({
            filename: "css/[name]/[name].css",
            chunkFilename: "[id].css"
        }),
        //https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE  参考官网
        new VueLoaderPlugin(),

        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, "../static"), // 不打包直接输出的文件
                to: "/static", // 打包后静态文件放置位置
                ignore: [".*"] // 忽略规则。（这种写法表示将该文件夹下的所有文件都复制）
            }
        ])
    ]),
    resolve:{
        alias:{
            "@": "****"
        }
    },
    //https://www.cnblogs.com/ufex/p/8758792.html 参考文章
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 将 `node_modules`目录下被打包的代码到`common/common.js`
                common: {
                    test: /node_modules/,
                    chunks: "initial",  //只对入口文件处理
                    name: "common",
                    minChunks: 5, //表示被引用次数，默认为1；5说明如果项目中引用次数大过5次，则打包成公共模块
                    maxInitialRequests: 5, // 最大的初始化加载次数，默认为1
                    minSize: 0 //表示在压缩前的最小模块大小，默认为0
                }
            }
        }
    }
};

module.exports = baseConfg;