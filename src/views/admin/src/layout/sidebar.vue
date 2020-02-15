<!--
 * @Author: your name
 * @Date: 2020-02-11 19:49:49
 * @LastEditTime : 2020-02-14 23:50:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\admin\src\layout\sidebar.vue
 -->
<template>
    <div class="sidebar">
        <div class="sidebar-user">
            <div class="img"><img src="https://www.vipbic.com/uploads/20190321/e561b9dbf43336c22e277169027c8add.jpg"></div>
            <div class="name">vipbic</div>
            <div class="title">团队管理员</div>
        </div>
        <div class="scrollbar">
            <div class="sidebar-menu">
                <template v-for="(menuItem,index) in list">
                    <my-tree :model="menuItem"  v-if="menuItem.meta.shows" :key="index"></my-tree>
                </template>
            </div>
        </div>
    </div>    
</template>
<script>
import myTree from './item.vue'
export default {
    data(){
        return {
            list:[],
            active:''
        }
    },
    components:{
        myTree
    },
    created(){
        this.list = this.$router.options.routes;
        console.log(this.$router)
    }
}
</script>
<style lang="less" scoped>
.sidebar{
    padding-top: 50px;
    height: 100%;
    box-sizing: border-box;
    &-user{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height:200px;
        .img{
            width: 120px;
            height: 120px;
            border-radius: 50%;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .name{
            font-size: 20px;
            color: #6b5af4;
            margin-top: 15px;
            font-weight: bold;
        }
        .title{
            font-size: 16px;
            color: #666666;
            margin-top: 15px;
        }
    }
    .scrollbar{
        height: 100%;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        padding-top:15px;
    }
    &-menu{
        overflow: scroll;
        overflow-x: hidden!important;
        height: calc(100% - 200px);
        &::-webkit-scrollbar {
            width : 6px;
            height: 1px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius   : 10px;
            background-color: #f1f5f7;
            // 渐变色
            background-image: -webkit-linear-gradient(45deg,rgba(255, 255, 255, 0.2) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.2) 50%,rgba(255, 255, 255, 0.2) 75%,transparent 75%,transparent);
        }
        &::-webkit-scrollbar-track {
            box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0);
            background   : #ffffff;
            border-radius: 10px;
        }
    }
}
</style>