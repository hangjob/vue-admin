const multiple = require("./pages.js");
// "build": "vue-cli-service build --mode test", 修改打包命令
// https://suyi123.com/2018/11/01/vue-cli-3-%E5%A4%9A%E9%A1%B5%E5%BA%94%E7%94%A8%E4%B8%8E%E5%88%86%E5%8C%85/ 分包加载
module.exports = {
    pages: multiple,
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
}