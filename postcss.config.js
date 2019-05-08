
//处理样式前缀
module.exports = {
    plugins : [
        require("autoprefixer")({
            browsers : ["last 10 versions"]   //必须设置支持的浏览器才会自动添加添加浏览器兼容
        }),
        require("postcss-pxtorem")({
            rootValue: 100,
            unitPrecision: 5,
            propList: ["*"],
            selectorBlackList: [/^p/],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 6
        })
    ]
};