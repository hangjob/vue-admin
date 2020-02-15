/*
 * @Author: your name
 * @Date: 2019-10-10 21:18:32
 * @LastEditTime: 2020-02-15 09:59:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\admin\config\app.js
 */
const defaultErr = {
    path: "*",
    component: resolve => require(["@/views/admin/src/error/404.vue"], resolve),
    meta: { title: "404", icon: 'logo-xbox', shows: true },
};
const app = {
    SUCCESS_CODE: 1, // 后台成功的code
    LOGIN_PATH: '/login', // 请求过期失败跳转的路由
    url: '',
    defaultErr: defaultErr // 404
}
export default app;