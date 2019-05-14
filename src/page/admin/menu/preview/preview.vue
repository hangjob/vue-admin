<template>
    <section>
        <Card title="网页预览">
            <div slot="center" class="center">
                <div class="url-group">
                    <input type="text" v-model="search" name="urlfield"  placeholder="https://www.vipbic.com">
                    <a href="#">输入预览</a>
                </div>
                <div style="margin: 0 auto;width:30%;">
                    <link-prevue :url="url" cardWidth="100%">
                        <!-- 自定义loading -->
                        <template slot="loading">
                            <h1>Loading...</h1>
                        </template>
                    </link-prevue>
                </div>
            </div>
        </Card>
    </section>
</template>
<script>
import Card  from '../../common/component/base/card/card.vue'
// http://www.wheelsfactory.cn/#/detail?id=194 组件来源
import LinkPrevue from 'link-prevue'
import {debounce} from '../../../../../util/util.js'
export default {
    components:{
        Card,LinkPrevue
    },
    data(){
        return {
            url:'https://www.vipbic.com',
            search:''
        }
    },
    mounted(){
        this.$watch('search', debounce((newQuery) => {
            this.url = newQuery ? newQuery : 'https://www.vipbic.com'
        }, 600))
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>
    .center{
        display: flex;
        justify-content:space-between;
        flex-direction: column;
    }
    .url-group {
        width: 100%;
        margin-bottom: 10px;
        overflow: hidden;
        display: block;
        position: relative;
        input[type=text] {
            height: 40px;
            outline:none;
            padding: 1.5px;
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 10px;
            border:1px solid #fdf1ec;
            width: 100%;
            display: inline;
            margin: 0;
            color: #8d8d8d;
            font-family: Hind Siliguri,sans-serif;
            font-size: 15px;
        }
        a {
            border-radius: 0 10px 10px 0;
            font-family: Hind Siliguri,sans-serif;
            font-size: 14px;
            letter-spacing: .1em;
            color: #fff;
            background-color: #ffa9be;
            padding: 10px 20px;
            text-align: center;
            display: inline-block;
            text-decoration: none!important;
            transition: all .2s ease-in-out;
            position: absolute;
            right: 0;
            top: 0;
        }
    }
</style>
