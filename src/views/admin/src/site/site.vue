<template>
    <section>
        <Card>
            <div slot="center" class="center">
                <div class="color1"><Nmuber title="总盈利" :endVal=999888777></Nmuber></div>
                <div class="color2"><Nmuber title="累计盈利" :endVal=999888777></Nmuber></div>
                <div class="color3"><Nmuber></Nmuber></div>
                <div class="color4"><Nmuber title="累计盈利"></Nmuber></div>
            </div>
        </Card>
    </section>
</template>
<script>
import Card  from '../../components/base/card/card.vue';
import Nmuber from '../../components/base/card/number.vue'
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
