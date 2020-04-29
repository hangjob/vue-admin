import Vue from 'vue';

const header = r => require.ensure([], () => r(require('./header.vue')), 'header');

Vue.component('PMheader', header);