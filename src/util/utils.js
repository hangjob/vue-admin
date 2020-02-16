/*
 * @Author: your name
 * @Date: 2019-10-10 21:18:31
 * @LastEditTime : 2020-02-14 17:03:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\util\utils.js
 */
const utils = {}
    /**
     * currentStyle属性和getComputedStyle属性不能设置属性,只能获取
     *currentStyle:该属性只兼容IE,不兼容火狐和谷歌
     *写法:ele.currentStyle["attr"]或者ele.currentStyle.attr;
     *getComputedStyle:该属性是兼容火狐谷歌,不兼容IE
     *写法:window.getComputedStyle(ele,null)[attr]获取是window.getComputedStyle(ele,null).attr
     * @param {dom元素} oElement 
     * @param {获取属性如：with，height} sName 
     */
utils.getStyle = (oElement, sName) => {
    return oElement.currentStyle ? oElement.currentStyle[sName] : getComputedStyle(oElement, null)[sName];
}


/**
 * 判断元素是否是dom元素
 * 先要对HTMLElement进行类型检查，因为即使在支持HTMLElement
 * 的浏览器中，类型却是有差别的，在Chrome,Opera中HTMLElement的类型为function，此时就不能用它来判断了
 * @param {dom元素} oElement 
 */
utils.isDom = (oElement) => {
    if (typeof HTMLElement === "object") {
        return oElement instanceof HTMLElement;
    } else {
        return oElement && typeof oElement === "object" && oElement.nodeType === 1 && typeof oElement.nodeName === "string";
    }
}


/**
 * 判断浏览器
 */
utils.getOs = () => {
    if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
        return "MSIE8";
    } else if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
        return "MSIE6";
    } else if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
        return "MSIE7";
    } else if (navigator.userAgent.indexOf("Firefox") > 0) {
        return "Firefox";
    }
    if (navigator.userAgent.indexOf("Chrome") > 0) {
        return "Chrome";
    } else {
        return "Other";
    }
}

/***
 * 防抖
 * @param func 输入完成的回调函数
 * @param delay 延迟时间
 */
utils.debounce = function(fn, wait) {
    let timer = null;
    return function() {
        let context = this
        let args = arguments
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function() {
            fn.apply(context, args)
        }, wait)
    }
}

/**
 * 节流
 * 标不断点击触发，mousedown(单位时间内只触发一次)
 * 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
 */
utils.throttle = function(fn, wait) {
    let canRun = true; // 通过闭包保存一个标记
    return function() {
        if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
        canRun = false; // 立即设置为false
        setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
            fn.apply(this, arguments);
            // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
            canRun = true;
        }, wait);
    };
}

/**
 * 获取cookie
 */
utils.getCookie = function(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//设置cookie,增加到vue实例方便全局调用
utils.setCookie = function(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    // toGMTString() 方法可根据格林威治时间 (GMT) 把 Date 对象转换为字符串，并返回结果。
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
utils.delCookie = function(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};


// 对象排序
utils.sort = function(arr, pro) {
    for (var i = arr.length - 1; i > 0; i--) {
        for (var j = 0; j < i; j++) {
            var tmp = arr[j][pro];
            if (tmp > arr[j + 1][pro]) {
                arr[j] = arr[j + 1]
                arr[j + 1][pro] = tmp;
            }
        }
    }
}

/**
 * 列子：arr.sort(utils.compare('sort'))
 * pro 对象排序的字段
 */
utils.compare = function(pro) {
    return function(a, b) {
        var value1 = a[pro];
        var value2 = b[pro];
        return value1 - value2;
    }
}

// 生成树形结构
utils.toTree = function(data) {
    // 删除 所有 children,以防止多次调用
    let tier = 1; // 标识当前菜单层级
    data.forEach(function(item) {
        delete item.children;
    });

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    var map = {};
    data.forEach(function(item) {
        item.tier = tier;
        map[item.id] = item;
    });
    //        console.log(map);
    var val = [];
    data.forEach(function(item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.pid];
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            if (!parent.children) {
                item.tier = 3;
                parent.children = [];
            }
            item.tier = 2;
            parent.children.push(item)
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
        }
    });
    return val;
}


export default utils;