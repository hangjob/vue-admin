<template>
    <section>
        <Card title="按钮预览">
            <div slot="center" class="center">
                <Button type="success" class="custom-btn"> 
                    <touch-ripple class="touch-ripple" :speed="0.5" :opacity="0.3" color="#fff" transition="ease-out">
                        <div>兮何年<br/>一人一马过关</div>
                    </touch-ripple>
                </Button>
                <Button type="warning" class="custom-btn"> 
                    <touch-ripple class="touch-ripple" :speed="0.5" :opacity="0.3" color="#fff" transition="ease-out">
                        <div>不忧伤<br/>不心急</div>
                    </touch-ripple>
                </Button>
                <Button type="error" class="custom-btn"> 
                    <touch-ripple class="touch-ripple" :speed="0.5" :opacity="0.3" color="#fff" transition="ease-out">
                        <div>生命有高峰也有低谷，根本没有一帆风顺的人生<br/>要拿得起，放得下，拿得起是一种勇气，放得下就需要一种胸怀</div>
                    </touch-ripple>
                </Button>
            </div>
        </Card>
    </section>
</template>
<script>
import Card  from '../../common/component/base/card/card.vue';
import { touchRipple } from 'vue-touch-ripple'
import 'vue-touch-ripple/dist/vue-touch-ripple.css'
export default {
    components:{
        Card,touchRipple
    },
    data(){
        return {
           
        }
    },
    mounted(){
        
    },
    methods:{
    }
}
</script>
<style lang="less" scoped>
    .center{
        display: flex;
        justify-content:space-between;
        flex-direction: column;
    }
    .custom-btn{
        padding: 0;
        margin-bottom: 10px;
    }
    .touch-ripple{
       width: 100%;
       padding: 10px;
    }
</style>
