import Vue from 'vue';
const has = {
    inserted: function (el, binding) {
        // 添加指令 传入的  value
        if (!binding.value) {
            el.parentNode.removeChild(el);
        }
    }
}
Vue.directive('has',has)
