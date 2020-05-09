# 一份完整的vue-cli3项目基础配置项

## 安装依赖
```
cnpm install
```

### 开发模式
```
npm run dev
```

### 打包测试环境
```
npm run test
```

### 测试和生产一起打包
```
npm run publish
```

### 打包生产环境
```
npm run build
```

### 目录结构
```shell
├── public						静态模板资源文件
├── src                         项目文件
├──|── assets                   静态文件 img 、css 、js    
├──|── components               全局组件
├──|── http                     请求配置
├──|── layout                   布局文件
├──|── mock                     测试数据
├──|── modules                  放置动态是添加路由的页面
├──|── router                   路由
├──|── store                    vuex数据管理
├──|── utils                    工具文件
├──|── view                     页面文件
├──|── App.vue                  
├──|── main.js                  
├── .env.development            开发模式配置
├── .env.production             正式发布模式配置
├── .env.test                   测试模式配置
├── entrance.js                 入口文件
├── vue.config.js               config配置文件
```
