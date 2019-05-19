<template>
    <section>
        <Card title="滚动加载">
            <div slot="center" class="center">
                <header>
                    <h1>滚动加载</h1>
                </header>
                <div v-for="(item, $index) in list" :key="$index">
                    <h3>{{item.title.substr(0,10)}}</h3>
                </div>
                <infinite-loading @infinite="infiniteHandler">
                    <div slot="spinner">Loading...</div>
                    <div slot="no-more">No more message</div>
                    <div slot="no-results">No results message</div>
                </infinite-loading>
            </div>
        </Card>
        <Card title="滚动加载">
            <div slot="center" class="center" style="overflow:hidden">
                <div class="wrapper">
                    <ul class="content">
                        <li v-for="(item,$index) in list" :key="$index">
                            {{item.title.substr(0,10)}}
                        </li>
                    </ul>
                    <!-- <div class="pulldown-wrapper">下拉加载</div> -->
                    <div class="loading-wrapper">Loading...</div>
                </div>
            </div>
        </Card>
    </section>
</template>
<script>
import Card  from '../../components/base/card/card.vue';
import axios from 'axios';
import {isGet} from '../../../../extend/util/api.js'
// https://peachscript.github.io/vue-infinite-loading/zh/guide/#%E5%AE%89%E8%A3%85%E6%8F%92%E4%BB%B6
import InfiniteLoading from 'vue-infinite-loading';

// https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/installation.html#npm
import BScroll from 'better-scroll'

const api = '//hn.algolia.com/api/v1/search_by_date?tags=story';
export default {
    components:{
        Card,InfiniteLoading
    },
    data(){
        return {
            page: 1,
            list: [],
        }
    },
    mounted(){
        this.$nextTick(()=>{
            if(!this.scroll){
                this.scroll = new BScroll('.wrapper',{
                    click: true,
                    scrollY: true,
                    pullDownRefresh: {
                        threshold: 50, // 下拉距离超过50px触发pullingDown事件
                        stop: 20 // 回弹停留在距离顶部20px的位置
                    }
                });
                this.scroll.on('pullingDown',(pos)=>{
                    alert('你正在上拉刷新中')
                    this.scroll.finishPullDown();
                })
            }else{
                this.scroll.refresh()
            }
        })
    },
    methods:{
        infiniteHandler($state){
            isGet(api, {
               page: this.page
            }).then(data => {
                if (data.hits.length && this.page<5) {
                    this.page += 1;
                    this.list.push(...data.hits);
                    $state.loaded();
                } else {
                    $state.complete();
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
    .center{
        display: flex;
        justify-content:space-between;  
        flex-direction:column;
        height:300px;
        overflow-y:scroll;
        position: relative;
    }
    .wrapper{
        width: 100%;
        overflow: hidden;
        position: relative;
        .pulldown-wrapper{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            background-color: #f7f7f7;
            height: 30px;
            line-height: 30px;
        }
    }
</style>
