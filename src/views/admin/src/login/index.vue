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
        <Input v-model="name" placeholder="Enter something..."/>
        <Input v-model="pas" placeholder="Enter something..." />
        <Button type="success" long @click="btnLogin">登录</Button>
    </div>   
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    data(){
        return {
            name:'',
            pas:''
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
                    this.$router.push({name:'main'})
                }else{
                    console.log('出错提示')
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>

</style>