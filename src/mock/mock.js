const Mock = require('mockjs')

// 获取 mock.Random 对象
const Random = Mock.Random
// mock新闻数据，包括新闻标题title、内容content、创建时间createdTime
const produceNewsData = function () {
    let newsList = []
    for (let i = 0; i < 3; i++) {
        let newNewsObject = {}
        if(i === 0){
            newNewsObject.path = '/add/article';
            newNewsObject.name  = 'add-article';
            newNewsObject.component = 'modules/add/article/article';
        }
        if(i === 1){
            newNewsObject.path = '/detail/article';
            newNewsObject.name  = 'detail-article';
            newNewsObject.component = 'modules/detail/article/article'
        }
        if(i === 2){
            newNewsObject.path = '/edit/article';
            newNewsObject.name  = 'edit-article';
            newNewsObject.component = 'modules/edit/article/article'
        }
        newsList.push(newNewsObject)
    }
    return newsList;
}


Mock.mock('/mock/menu', {data:{list:produceNewsData},code:1,msg:'请求成功'})