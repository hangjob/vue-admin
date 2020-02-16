<!--
 * @Author: your name
 * @Date: 2020-02-11 19:49:49
 * @LastEditTime : 2020-02-14 23:50:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\admin\src\layout\sidebar.vue
 -->
<template>
    <div class="sidebars">
        <div class="sidebars-user">
            <div class="img"><img src="https://www.vipbic.com/uploads/20190321/e561b9dbf43336c22e277169027c8add.jpg"></div>
            <div class="name">vipbic</div>
            <div class="title">团队管理员</div>
        </div>
        <div class="scrollbar">
            <div class="sidebars-menu">
               <treeMenus></treeMenus>
            </div>
        </div>
    </div>    
</template>
<script>
import treeMenus from './treeMenus.vue'
export default {
    data(){
        return {
            shop:''
        }
    },
    components:{
        treeMenus
    },
    created(){
        
    },
    mounted(){
      
    }
}
</script>
<style lang="less">
.sidebars{
    padding-top: 50px;
    height: 100%;
    box-sizing: border-box;
    &-user{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height:200px;
        padding-bottom:20px;
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
        height: calc(100% - 220px);
        &::-webkit-scrollbar {
            width : 0px;
            height: 1px;
        }
        .el-menu{
            border-right:0
        }
    }
}
</style>