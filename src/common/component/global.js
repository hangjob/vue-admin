
// 全局自动引用-component中的.vue组件

import Vue from "vue";

function capitalizeFirstLetter(string){
    //将首字母转大写，然后拼接
    //首先找到 -w 开头的字母 ，然后把字母变大写，如果开头是小写把它 变大写 ，然后把 - 清空
    return string.replace(/\-\w/g,function($1){
        return $1.toLocaleUpperCase();
    }).replace(/^[a-z]/,function($1){
        return $1.toLocaleUpperCase();
    }).replace(/\-/g,"");
    // return string.charAt(0).toUpperCase() + string.slice(1)
}

//详情--https://www.jianshu.com/p/c894ea00dfec
//directory {String} -读取文件的路径
//useSubdirectories {Boolean} -是否遍历文件的子目录
//regExp {RegExp} -匹配文件的正则
const requireComponent = require.context(
    ".",false,/\.vue$/
);

requireComponent.keys().forEach(fileName=>{
    const componentConfig = requireComponent(fileName); 
    //因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名 
    const componentName = capitalizeFirstLetter(fileName.replace(/^\.\//, "").replace(/\.\w+$/, "")); 
    Vue.component(componentName,componentConfig.default || componentConfig);
});