<template>
    <section class="headers">
        <div class="nav">
            <breadcrumbNav class="item"></breadcrumbNav>
        </div>
        <div class="icon flex">
            <div><i class="fa fa-question-circle"></i></div>
            <div><i class="fa fa-bell"></i><span>5</span></div>
            <div><i class="fa fa-envelope"></i></div>
            <div><i class="fa fa-list-ul"></i></div>
        </div>
    </section>
</template>
<script>
import breadcrumbNav from './breadcrumb-nav.vue';
export default {
    components:{
        breadcrumbNav
    },
    mounted(){
    }
}
</script>
<style lang="less">
.headers{
    height: 35px;
    background-color: #ffffff;
    padding: 0 15px;
    display: flex;
    align-items: center;
    .nav{
        display: flex;
        align-items: center;
        height: 100%;
        flex: 1;
        .item{
            div{
                font-size: 10px;
            }
        }
    }
    .icon{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
        & div{
            margin-left:20px;
            position: relative;
            cursor: pointer;
            i{
                color: #9c9c9c;
                font-size: 17px;
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
    }
}
</style>
