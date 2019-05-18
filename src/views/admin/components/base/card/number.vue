<template>
    <div class="number">
        <div class="ft14 title">{{title}}</div>
        <div class="num">
            <count-to :start-val='0' :end-val='endVal' prefix='¥ ' :duration='duration'></count-to>
        </div>
    </div>
</template>
<script>
import countTo from 'vue-count-to';
export default {
    components:{
        countTo
    },
    props:{
        title:{
            type:String,
            default:'累计盈利'
        },
        endVal:{
            type:Number,
            default:99888777,
            // required: true
        },
        duration:{
            type:Number,
            default:3000,
        }
    },
    mounted(){
        console.log( typeof this.endVal)
    }
}
</script>
<style lang="less" scoped>
.number{
    width: 150px;
    padding: 15px 0;
    background-color: #ffffff;
    border:1px solid #f7f8fc;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 6px;
}
</style>
