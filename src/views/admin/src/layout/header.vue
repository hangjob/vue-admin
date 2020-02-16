<!--
 * @Author: your name
 * @Date: 2020-02-16 16:46:47
 * @LastEditTime: 2020-02-16 16:46:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\admin\src\layout\header.vue
 -->
<template>
    <div class="header">
        <div class="header-data">
            <i class="el-icon-date"></i>
            <span>{{week}} / {{time}}</span>
        </div>
        <div class="header-mseg"></div>
    </div>
</template>
<script>
export default {
    data(){
        let week = " 星期"+"日一二三四五六".charAt(new Date().getDay())
        let date = new Date()
        return {
            week,
            time:date.toLocaleTimeString()
        }
    }
}
</script>
<style lang="less" scoped>
.header{
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 35px;
    &-data{
        display: flex;
        align-items: center;
        i{
            font-size: 24px;
            padding-right: 10px;
            color: #999999;
        }
        span{
            color: #6b5af4;
            font-size: 16px;
        }
    }
}
</style>