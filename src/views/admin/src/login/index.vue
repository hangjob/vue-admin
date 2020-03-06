<!--
 * @Author: your name
 * @Date: 2019-10-10 21:18:32
 * @LastEditTime : 2020-02-15 00:05:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\admin\src\login\index.vue
 -->
<template>
    <div>
        <el-input v-model="name" placeholder="请输入内容"></el-input>
        <el-input v-model="pas" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="btnLogin">登录</el-button>
    </div>   
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data(){
        return {
            name:'123456',
            pas:'123456'
        }
    },
    methods:{
        ...mapActions([
            'getMenuList',
            'getUserInfo'
        ]),
        async btnLogin(){
            let userInfo = await this.getUserInfo();
            if(userInfo && userInfo.name){
                let menuList = await this.getMenuList();
                if(menuList){
                    this.$router.push({path:'/home'})
                }else{
                    console.log('出错提示')
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
button{
    width:100%;
}
</style>