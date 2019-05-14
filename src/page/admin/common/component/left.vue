<template>
    <section class="left">
        <div class="title bg-pink"><h3 class="ft18 ft-white">后台管理系统</h3></div>
        <div class="menu">
            <ul>
                <li v-for="item,i in menus" :key="i">
                    <div :class="['level','level-one','flex-center',{active:active === i}]" @click="clickActive(item.index,menus[i],i)">
                        <div><i :class="['fa','ft10','ft-gray',item.icon]"></i></div>
                        <div><span class="ft8 ft-gray">{{item.title}}</span></div>
                        <div><i v-if="item.children && item.children.length != 0" class="fa fa-caret-down ft8 ft-gray"></i></div>
                    </div>
                    <transition name="bounce">
                        <ul class="level-two" v-show="item.shows && item.children && item.children.length != 0">
                            <li v-for="chid,j in item.children" :key="j">
                                <div @click="clickActive(chid.index,menus[i].children[j],''+i+j)" :class="['level-two-name','flex-center',{active:active == ''+i+j}]">
                                    <span class="ft8 ft-gray flex1">{{chid.title}}</span>
                                    <i v-if="chid.children && chid.children.length != 0" class="fa fa-caret-down ft8 ft-gray"></i>
                                </div>
                                <transition name="bounce">
                                    <ul class="level-three" v-show="chid.shows && chid.children && chid.children.length != 0" >
                                        <li v-for="son,k in chid.children" :key="k">
                                            <div :class="['level-two-name','flex-center',{active:active == ''+i+j+k}]" @click="clickActive(son.index,menus[i].children[j].children[k],''+i+j+k)">
                                                <span class="ft8 ft-gray flex1">{{son.title}}</span>
                                                <i v-if="son.children && son.children.length != 0" class="fa fa-caret-down ft8 ft-gray"></i>
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
import routers from "../../../../router/router.js"
export default {
    data(){
        return {
            menus:[],
            active:'0'
        }
    },
    created(){
        this.menus = routers;
    },
    methods:{
        clickActive(path,item,i){
            if(path){
                this.active = i;
                this.$router.push(path);
            }else{
                item.shows = !item.shows
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
