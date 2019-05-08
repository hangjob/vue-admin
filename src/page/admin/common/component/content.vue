<template>
    <section class="content">
        <Headers></Headers>
        <div style="padding:0 20px;">
            <router-view></router-view>
        </div> 
    </section>
</template>
<script>
import Headers from './headers.vue';
export default {
    components:{
        Headers
    }
}
</script>
<style lang="less" scoped>
.content{
    height: 100%;
    width: 100%;
}
</style>
