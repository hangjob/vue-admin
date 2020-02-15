<!--
 * @Author: your name
 * @Date: 2020-02-11 18:02:51
 * @LastEditTime : 2020-02-11 23:28:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\admin\src\layout\main.vue
 -->
<template>
    <div class="main">
        <section class="main-left">
            <sidebar></sidebar>
        </section>
        <section class="main-right">
            <div class="main-right-head">顶部</div>
            <div class="main-right-container">
                <div class="app-main">
                    <router-view></router-view>
                </div>
            </div> 
        </section>   
    </div>    
</template>
<script>
import sidebar from './sidebar.vue'
export default {
    components:{
        sidebar
    }
}
</script>
<style lang="less" scoped>
.main{
    overflow: hidden;
    &-left{
        width: 310px;
        background-color: #ffffff;
        transition: width .28s;
        height: 100%;
        position: fixed;
        font-size: 0;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        border-right: 1px solid #e3e3e5;
        box-sizing: border-box;
        font-size: 12px;
    }
    &-right{
        transition: margin-left .28s;
        margin-left: 310px;
        position: relative;
        width: 100%;
        &-head{
            height: 90px;
            border-bottom: 1px solid #e3e3e5;
            background-color: #ffffff;
            position: fixed;
            top: 0;
            right: 0;
            z-index: 9;
            width: calc(100% - 310px);
            -webkit-transition: width .28s;
            transition: width .28s;
            box-sizing: border-box;
        }
        &-container{
            width: 100%;
            position: relative;
            overflow: hidden;
            padding: 34px 34px 0;
            box-sizing: border-box;
            margin-top: 90px;
            .app-main{
                background-color: #ffffff;
            }
        }
    }
}
</style>