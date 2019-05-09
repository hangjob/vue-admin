<template>
    <section class="left">
        <div class="title bg-pink"><h3 class="ft18 ft-white">后台管理系统</h3></div>
        <div class="menu">
            <ul>
                <li v-for="item,i in menus" :key="i">
                    <div :class="['level','level-one','flex-center',{active:item.shows}]" v-on:click.stop.prevent="clickActive(i)">
                        <div><i :class="['fa','ft10','ft-gray',item.meta.icon]"></i></div>
                        <div><span class="ft8 ft-gray">{{item.meta.title}}</span></div>
                        <div><i v-if="item.children && item.children.length != 0" class="fa fa-caret-down ft8 ft-gray"></i></div>
                    </div>
                    <transition name="bounce">
                        <ul class="level-two" v-show="item.shows && item.children && item.children.length != 0">
                            <li v-for="item,j in item.children" :key="j">
                                <div :class="['level-two-name','flex-center',{active:item.shows}]" v-on:click.stop.prevent="clickActive(i,j)">
                                    <span class="ft8 ft-gray flex1">{{item.meta.title}}</span>
                                    <i v-if="item.children && item.children.length != 0" class="fa fa-caret-down ft8 ft-gray"></i>
                                </div>
                                <transition name="bounce">
                                    <ul class="level-three" v-show="item.shows && item.children && item.children.length != 0" >
                                        <li v-for="item,k in item.children" :key="k">
                                            <div :class="['level-two-name','flex-center',{active:item.shows}]" v-on:click.stop.prevent="clickActive(i,j,k)">
                                                <span class="ft8 ft-gray flex1">{{item.meta.title}}</span>
                                                <i v-if="item.children && item.children.length != 0" class="fa fa-caret-down ft8 ft-gray"></i>
                                            </div>
                                        </li>
                                    </ul>
                                </transition>
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
export default {
    data(){
        return {
            menus:[]
        }
    },
    created(){
        if(this.$router.options.routes.length != 0){
            let routers = JSON.parse(JSON.stringify(this.$router.options));
            routers.routes.splice(0,1)
            this.menus = routers.routes[0].children
            console.log(this.menus)
        }else{
            // 默认值
            this.menus = [{name:"暂无菜单",icon:"fa-pie-chart"}]
        }
    },
    methods:{
        clickActive(i,j,k){
            if((i || i == 0) && (j || j == 0) && (k || k == 0)){
                this.menus[i].children[j].children[k].shows = !this.menus[i].children[j].children[k].shows;
                if(this.menus[i].children[j].children[k].path){
                    if(!this.menus[i].children[j].children[k].children || this.menus[i].children[j].children[k].children == 0){
                        this.$router.push(this.menus[i].children[j].children[k].path)
                    }
                }
                return false;
            }
            if((i || i == 0) && (j || j == 0)){
                this.menus[i].children[j].shows = !this.menus[i].children[j].shows;
                if(this.menus[i].children[j].path){
                   if(!this.menus[i].children[j].children || this.menus[i].children[j].children == 0){
                        this.$router.push(this.menus[i].children[j].path)
                    }
                }
                return false;
            }
            if(i || i == 0){
                this.menus[i].shows = !this.menus[i].shows;
                if(this.menus[i].path){
                    if(!this.menus[i].children || this.menus[i].children == 0){
                        this.$router.push(this.menus[i].path)
                    }
                }
                return false;
            }
        }
    }
}
</script>
<style lang="less" scoped>
.left{
    height: 100%;
    width: 100%;
    background-color: #1a293c;
    color: #ffffff;
    .title{
        height: 50px;
        line-height: 50px;
        text-align: center;
    }
    li{
        list-style: none;
    }
    .flex-center{
        cursor: pointer;
    }
    span,i{
        transition: all 0.5s;
    }
    .active i,.active span{
        color: #ff7068 !important;
    }
    .active i.fa-caret-down{
        transform: rotate(180deg)
    }
    .level{
        padding: 10px 0;
        border-bottom: 1px solid #21344b;
    }
    .level-one > div:first-child{
        padding-left: 20px;
    }
    .level-one > div:nth-of-type(2){
        padding-left: 10px;
    }
    .level-two{
        padding-left: 38px;
        background-color: #0e1a2a;
        overflow: hidden;
        border-left: 4px solid #ff7068;
        padding-right: 10px;
    }
    .level-two .level-two-name{
        padding: 10px 0;
    }
    .level-three{
        padding-left: 0.50rem;
        background: #0e1a2a;
        margin-right: -0.1rem;
        padding-right: .1rem;
        margin-left: -0.40rem;
        overflow: hidden;
    }
    .level-three > div{
        margin: 15px 0;
    }
    .level-one > div:last-child{
        flex: 1;
        text-align: right;
        padding-right: 10px;
    }
}
.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scaleX(0);
    transform:translateY(0px);
  }
  50% {
    transform: scaleX(0.5);
     transform:translateY(10px);
  }
  100% {
    transform: scaleX(1);
    transform:translateY(0px);
  }
}
</style>
