<template>
    <section class="card">
        <div class="top">
            <slot name="top">
                <div class="icon"><i class="fa fa-gg-circle ft10"></i></div>
                <div class="title"><span class="ft10">业绩总览</span></div>
            </slot>
        </div>
        <div class="center clearfix">
            <slot name="center"></slot>
        </div>
        <div class="down">
            <slot name="down"></slot>
        </div>
    </section>
</template>
<script>

export default {
    mounted(){
        
    }
}
</script>
<style lang="less" scoped>
.card{
    background-color: #ffffff;
    border-radius: 5px;
    margin:5px 0;
    .top{
        background-color: #f7f7f7;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 12px 5px;
        display: flex;
        align-items:center;
        color: #ff7068;
        .icon{
            margin-right: 5px;
        }
    }
    .center{
        padding: 10px 15px;
    }
    .down{
        border-radius: 5px;
    }
}
</style>
