/*
 * @Author: your name
 * @Date: 2020-02-12 22:57:31
 * @LastEditTime : 2020-02-15 00:14:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\server.js
 */
let express  = require('express');
let app = express();
//在后端配置，让所有人都可以访问api接口 跨域问题

app.use('*', function(req, res, next) {    
    res.header('Access-Control-Allow-Origin', '*');     //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');    
    res.header('Access-Control-Allow-Methods', '*');    
    res.header('Content-Type', 'application/json;charset=utf-8');    
    next();
});

app.get('/role', (req, res) => {    
    res.json({        
        menus: [            
            {  id: 1, sort: 1, path: '/preview', component: 'views/admin/src/preview/index', meta: { title: "数据分析", icon: 'md-analytics', shows: true }, pid: '' },
            {  id: 2, sort: 8, path: '/financial', component: 'views/admin/src/financial/index', meta: { title: "财务管理", icon: 'md-card', shows: true }, pid: '' },
            {  id: 3, sort: 3, path: '/certification', component: 'views/admin/src/certification/index', meta: { title: "认证资质", icon: 'md-unlock', shows: true }, pid: '' },
            {  id: 4, sort: 1, path: '/integrated', component: 'views/admin/src/integrated/index', meta: { title: "综合管理", icon: 'md-settings', shows: true }, pid: '' } ,
            {  id: 5, sort: 6, path: '/project', component: 'views/admin/src/project/index', meta: { title: "项目管理", icon: 'md-paper', shows: true }, pid: '' } ,
            {  id: 6, sort: 1, path: '/abnormal', component: 'views/admin/src/abnormal/index', meta: { title: "异常管理", icon: 'md-bug', shows: true }, pid: '' },
            {  id: 7, sort: 1, path: '/realtime', component: 'views/admin/src/realtime/index', meta: { title: "实时监控", icon: 'md-clock', shows: true }, pid: '' },
            {  id: 8, sort: 1, path: '/preview/toutiao1', component: 'views/admin/src/preview/toutiao/index', meta: { title: "头条数据1", icon: 'md-disc', shows: true }, pid: '' },
            {  id: 9, sort: 1, path: '/preview/toutiao2', component: 'views/admin/src/preview/toutiao/index', meta: { title: "头条数据2", icon: 'md-disc', shows: true }, pid: '' },
            {  id: 10, sort: 1, path: '/preview/toutiao3', component: 'views/admin/src/preview/toutiao/index', meta: { title: "头条数据3", icon: 'md-disc', shows: true }, pid: '' },
            {  id: 11, sort: 1, path: '/preview/toutiao4', component: 'views/admin/src/preview/toutiao/index', meta: { title: "头条数据4", icon: 'md-disc', shows: true }, pid: 1 },
            {  id: 12, sort: 1, path: '/preview/toutiao5', component: 'views/admin/src/preview/toutiao/index', meta: { title: "头条数据5", icon: 'md-disc', shows: true }, pid: 1 },
            {  id: 13, sort: 1, path: '/preview/toutiao6', component: 'views/admin/src/preview/toutiao/index', meta: { title: "头条数据6", icon: 'md-disc', shows: true }, pid: 12 },           
        ]   
    })
})

app.get('/userinfo', (req, res) => {
    res.json({
        name: '羊先生',
        age: '27',
        sex: '男',
        mesg: 'admin'
    })
})


//监听3000端口
app.listen(3001);