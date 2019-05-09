<template>
    <Row class="h100">
        <Col class="h100" :xs="6" :sm="4" :md="4" :lg="4">
            <Left></Left>
        </Col>
        <Col :xs="18" :sm="20" :md="20" :lg="20">
            <section class="content">
                <Headers></Headers>
                <div style="padding:0 1%;">
                    <router-view></router-view>
                </div> 
            </section>
        </Col>
    </Row>
</template>
<script>
import Left from './left.vue'
import Headers from './headers.vue';
export default {
    components:{
        Headers,Left
    },
    mounted(){
    }
}
</script>
<style lang="less" scoped>
.content{
    height: 100%;
    width: 100%;
}
</style>
