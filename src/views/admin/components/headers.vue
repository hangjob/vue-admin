<template>
    <div class="box-headers">
        <section class="headers">
            <div class="nav">
                <breadcrumbNav class="item"></breadcrumbNav>
            </div>
            <div class="icon flex">
                <div><i class="fa fa-question-circle"></i></div>
                <div><i class="fa fa-bell"></i><span>5</span></div>
                <div><i class="fa fa-envelope"></i></div>
                <div class="userImg" @click="visible = !visible"><img src="../img/user.jpg"></div>
            </div>
        </section>
        <transition name="fade">
           <div class="rest" v-if="visible">
                <ul>
                    <li><a>个人中心</a></li>
                    <li><a>首页</a></li>
                    <li><a href="https://github.com/hangjob/vue-admin" target="_blank">项目地址</a></li>
                    <li><a href="javascript:;" @click="logout">退出登录</a></li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
import breadcrumbNav from './breadcrumb-nav.vue';
export default {
    components:{
        breadcrumbNav
    },
    data(){
        return {
            switchValue: true,
            visible: false
        }
    },
    mounted(){
    },
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push('/login');
        }
    }
}
</script>
<style lang="less">
.box-headers{
    position: relative;
}
.headers{
    height: 60px;
    background-color: #ffffff;
    padding: 0 1%;
    display: flex;
    align-items: center;
    .nav{
        display: flex;
        align-items: center;
        height: 100%;
        flex: 1;
        .item{
            div{
                font-size: 14px;
            }
        }
    }
    .icon{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
        & div{
            margin-left:40px;
            position: relative;
            cursor: pointer;
            display: flex;
            i{
                color: #9c9c9c;
                font-size: 24px;
            }
            span{
                border-radius: 50%;
                text-align: center;
                background-color: #fc4a3a;
                position: absolute;
                box-sizing: content-box;
                width: 6px;
                height: 6px;
                color: #fff;
                font-size: 6px;
                padding: 3px;
                text-align: center;
                line-height: 6px;
                border: 1px solid #fff;
                right: -5px;
                top: 0px;
            }
        }
        .userImg{
            height: 80%;
            border-radius: 50%;
            overflow: hidden;
            img{
                height: 100%;
            }
        }
    }
}
.box-headers .rest{
    position: absolute;
    top: 61px;
    right: 3px;
    background-color: #ffffff;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    ul{
        li{
            list-style: none;
            font-size: 0;
            padding: 5px 8px;
            a{
                color: #999;
                font-size: 8px;
            }
        }
        li:last-child{
            border-top: 1px solid #ddd;
        }
        li:hover{
            background-color: #e8f4ff;
        }
        li:hover a{
            color: #46a6ff;
        }
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
