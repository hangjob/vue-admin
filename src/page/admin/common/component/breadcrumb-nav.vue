<template>
    <div>
        <Breadcrumb>
           <BreadcrumbItem 
            v-for="item,index in currentPath" 
            :to="item.index" 
            :key="index"
            >{{item.title}}</BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>
<script>
// every()是对数组中每一项运行给定函数，如果该函数对 每一 项返回true,则返回true。
// some()是对数组中每一项运行给定函数，如果该函数对 任一 项返回true，则返回true。

import { mapGetters,mapMutations,mapActions } from  "vuex"
import routers from "../../../../router/router.js"
import _ from "lodash";
export default {
    data(){
        return {
            currentPath:[]
        }
    },
    watch:{
        $route: {
            handler: function(val, oldVal){
                this.currentPath = this.findPathByLeafIndex(val.path,routers);
            },
            // 深度观察监听
            deep: true
        }
    },
    created(){
        // 刷新之后上来的赋值
        this.currentPath = this.findPathByLeafIndex(this.$route.path,routers);
    },
    mounted(){
    },
    computed:{
        ...mapGetters(['adminCurrentPath']),
    },
    methods:{

       ...mapMutations(['ADMINCURRENTPATH']),

        // 递归实现路由解析
        findPathByLeafIndex(index, nodes, path) {
            if(path === undefined) {
                path = [];
            }
            for(var i = 0; i < nodes.length; i++) {
                var tmpPath = path.concat();
                tmpPath.push(nodes[i]);
                if(index == nodes[i].index) {
                    return tmpPath;
                }
                if(nodes[i].children) {
                    var findResult = this.findPathByLeafIndex(index, nodes[i].children, tmpPath);
                    if(findResult) {
                        return findResult;
                    }
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>

</style>
