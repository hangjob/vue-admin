<template>
    <Row class="h100">
        <Col class="h100" :xs="6" :sm="4" :md="4" :lg="4"><Left></Left></Col>
        <Col :xs="18" :sm="20" :md="20" :lg="20"><Content></Content></Col>
    </Row>
</template>
<script>
import Left from './common/component/left.vue'
import Content from './common/component/content.vue'
export default {
    components:{
        Left,Content
    }
}
</script>
<style lang="less" scoped>

</style>
