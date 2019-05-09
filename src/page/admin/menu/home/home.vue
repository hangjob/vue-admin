<template>
   <div>11111</div>
</template>
<script>
import Left from '../../common/component/left.vue'
import Headers from '../../common/component/headers.vue';
export default {
    components:{
        Headers,Left
    },
    mounted(){
        console.log(this)
    }
}
</script>
<style lang="less" scoped>
.content{
    height: 100%;
    width: 100%;
}
</style>
