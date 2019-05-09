<template>
    <div>
        <Breadcrumb>
           <BreadcrumbItem 
            v-for="item in currentPath" 
            :to="item.path" 
            :key="item.name"
            >{{item.meta.title}}</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>
<script>
// every()是对数组中每一项运行给定函数，如果该函数对 每一 项返回true,则返回true。
// some()是对数组中每一项运行给定函数，如果该函数对 任一 项返回true，则返回true。

import { mapGetters,mapMutations,mapActions } from  'vuex'
export default {
    data(){
        return {
            currentPath:[]
        }
    },
    watch:{
        $route: {
            handler: function(val, oldVal){
               if(val.matched){
                   console.log(val)
                   this.currentPath = val.matched
               }
            },
            // 深度观察监听
            deep: true
        }
    },
    created(){
        // 刷新之后上来的赋值
        this.currentPath = this.$route.matched
    },
    mounted(){
        
    },
    computed:{
        ...mapGetters(['adminCurrentPath']),
    },
    methods:{
       ...mapMutations(['ADMINCURRENTPATH']),
    }
}
</script>
<style lang="less" scoped>

</style>
