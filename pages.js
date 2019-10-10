
//生成每页的配置项
const multiple = {
    index:{
        // page 的入口
        entry: 'src/views/index/index.js',
        // 模板来源
        template: 'public/index.html',
        // 在 dist/index.html 的输出
        filename: 'index.html',
        // 当使用 title 选项时，
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'index前台',
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    admin: {
        entry: 'src/views/admin/admin.js',
        title: 'admin',
        chunks: ['admin']
    },
    // ... 如有多页可以继续添加
};

const entry = {};

Object.keys(multiple).forEach((value) => {
    if(!multiple[value].template){
        multiple[value].template = 'public/index.html'
    }
    if(!multiple[value].filename){
        multiple[value].filename = `${value}.html`
    }
    if(multiple[value].chunks.length){
        multiple[value].chunks = [...new Set(['chunk-vendors', 'chunk-common'].concat(multiple[value].chunks))]
    }
    entry[value] = multiple[value];
});

module.exports = entry;