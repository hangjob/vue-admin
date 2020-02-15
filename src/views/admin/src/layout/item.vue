<!--
 * @Author: your name
 * @Date: 2020-02-14 17:32:56
 * @LastEditTime : 2020-02-14 19:55:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\src\views\admin\src\layout\item.vue
 https://zcheng.site/vue-transition.html
 https://www.jianshu.com/p/84eb67487113
 -->
<template>
    <collapse-transition>
        <ul>
            <li>
                <div :class="['bar',{active:$store.state.hasRol === model.path}]" :style="pdlStyle(model.tier)" @click="toggleChildren(model.path)">
                    <Icon :type="model.meta.icon" />
                    <span>{{model.meta.title}}</span>
                    <Icon :class="['bar-down',{rotate:showChildren}]" type="ios-arrow-down" v-if="model.children"/>
                </div>
                <template v-if="hasChild">
                    <tree-menus :model="item" v-for="(item,index) in model.children" :key="index" v-show="showChildren"></tree-menus>
                </template>
            </li>
        </ul>
    </collapse-transition>
</template>
<script>
import  CollapseTransition from "@/util/collapse-transition";
export default {
    name: "treeMenus",
    props: {
        model: Object,
    },
    components:{
        'collapse-transition': CollapseTransition
    },
    data(){
        return {
            showChildren: false,
        }
    },
    computed: {
        pdlStyle(){
            return function(str){
                str = str ? str : 1;
                return {
                    'padding-left': (40+ 20*str)+'px'
                }; 
            }
        },
        hasChild(){
            return this.model.children && this.model.children.length
        }
    },
    created(){
        
    },
    methods: {
        toggleChildren(rol){
           this.showChildren = !this.showChildren;
            // this.$emit('update:hasRol', rol) /.asyc
            this.$store.commit('setHasRol', rol)
            console.log(this.$store.matcher)
        }
    }
};
</script>
<style lang="less">
ul{
    display: flex;
    flex-direction: column;
    li{
        color: #666666;
        cursor: pointer;
        position: relative;
        .bar{
            padding: 25px 0;

            i{
                font-size: 22px;
            }
            span{
                margin-left: 35px;
                font-size: 16px;
            }
            &-down{
                position: absolute;
                right: 10px;
                transition: all .3s;
            }
            .rotate{
                transform: rotate(-90deg);
            }
            &:hover{
                background-color:rgba(107,90,244,0.8);
                color: #ffffff;
            }
        }
        .active{
            color: #ffffff;
            background-color:rgba(107,90,244,0.9);
        }
    }
}
</style>