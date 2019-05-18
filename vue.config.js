const multiple = require("./pages.js");
// "build": "vue-cli-service build --mode test", 修改打包命令

module.exports = {
    pages: multiple,
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
}