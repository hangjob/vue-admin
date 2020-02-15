/*
 * @Author: your name
 * @Date: 2020-02-15 16:01:53
 * @LastEditTime: 2020-02-15 16:01:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\util\transition.js
 */

const transitionStyle = '0.3s height ease-in-out';
const Transition = {

    // 进入中
    beforeEnter(el) {
        el.style.transition = transitionStyle;
        if (!el.dataset) el.dataset = {};
        el.style.height = 0;
    },

    // 回调函数 done 是可选的
    enter(el) {
        if (el.scrollHeight !== 0) {
            el.style.height = `${el.scrollHeight}px`;
        } else {
            el.style.height = '';
        }
        el.style.overflow = 'hidden';
    },

    afterEnter(el) {
        el.style.transition = '';
        el.style.height = '';
    },

    beforeLeave(el) {
        if (!el.dataset) el.dataset = {};
        el.style.display = 'block'; // 添加这一行
        el.style.height = `${el.scrollHeight}px`;
        el.style.overflow = 'hidden';
    },

    leave(el) {
        if (el.scrollHeight !== 0) {
            el.style.transition = transitionStyle;
            el.style.height = 0;
        }
    },

    afterLeave(el) {
        el.style.transition = '';
        el.style.height = '';
    },
};

export default {
    name: 'CollapseTransition',
    functional: true,
    render(h, { children }) {
        const data = {
            on: Transition,
        };
        return h('transition', data, children);
    },
};