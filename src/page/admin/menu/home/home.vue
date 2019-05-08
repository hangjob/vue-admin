<template>
    <section>
         <router-view></router-view>
    </section>
</template>
<script>
import Card  from '../../common/component/base/card/card.vue'
import Nmuber from '../../common/component/base/card/number.vue'
export default {
    components:{
        Card,Nmuber
    },
    data(){
        return {
            
        }
    },
    mounted(){
    }
}
</script>
<style lang="less" scoped>
  .center{
      display: flex;
      justify-content:space-between;
  }
</style>
