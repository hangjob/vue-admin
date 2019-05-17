/**
 * currentStyle属性和getComputedStyle属性不能设置属性,只能获取
 *currentStyle:该属性只兼容IE,不兼容火狐和谷歌
 *写法:ele.currentStyle["attr"]或者ele.currentStyle.attr;
 *getComputedStyle:该属性是兼容火狐谷歌,不兼容IE
 *写法:window.getComputedStyle(ele,null)[attr]获取是window.getComputedStyle(ele,null).attr
 * @param {dom元素} oElement 
 * @param {获取属性如：with，height} sName 
 */
export function getStyle(oElement, sName){
    return oElement.currentStyle ? oElement.currentStyle[sName] : getComputedStyle(oElement, null)[sName];
}


/**
 * 判断元素是否是dom元素
 * 先要对HTMLElement进行类型检查，因为即使在支持HTMLElement
 * 的浏览器中，类型却是有差别的，在Chrome,Opera中HTMLElement的类型为function，此时就不能用它来判断了
 * @param {dom元素} oElement 
 */
export function isDom(oElement){
    if(typeof HTMLElement === "object"){
        return oElement instanceof HTMLElement;
    }else{
        return oElement && typeof oElement === "object" && oElement.nodeType === 1 && typeof oElement.nodeName === "string";
    }
}


/**
 * 判断浏览器
 */
export function getOs() {    
    if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {        
        return "MSIE8";
    }else if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
        return "MSIE6";
    }else if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
        return "MSIE7";
    }else if (navigator.userAgent.indexOf("Firefox") > 0) {
        return "Firefox";
    }
    if (navigator.userAgent.indexOf("Chrome") > 0) {
        return "Chrome";
    }else {
        return "Other";
    }
}

/***
 * 防抖节流
 * @param func 输入完成的回调函数
 * @param delay 延迟时间
 */
export function debounce(func, delay) {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}