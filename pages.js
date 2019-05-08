const path = require("path");

//生成每页的配置项
module.exports = {
    pages: [
        {
            page: "admin",
            entry: path.resolve(__dirname, "./page/admin.js"), //指向入口文件
            title: "vipbic后台管理系统",
            template: path.resolve(__dirname, "./public/index.html"), //指向模板文件
            filename: "admin.html",
            minify: {
                removeAttributeQuotes: false, //删除属性的双引号
                collapseInlineTagWhitespace: true //折叠一行
            },
            chunks: ["admin","common"],  // 引入公共模块 ---在build/webpack.config.js下配置的公共模块--110行
            hash: true //生成带有hash值
        }
    ]
};