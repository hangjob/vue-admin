<template>
    <section>
        <Card title="桌面通知">
            <div slot="center" class="center">
                <div>
                    <Alert type="warning" show-icon v-if="!state">
                        浏览器通知权限
                        <template slot="desc">
                            禁用状态,请先打开通知权限一般在浏览器地址栏输入框前方
                        </template>
                    </Alert>
                    <Alert type="success" show-icon v-if="state">
                        浏览器通知权限
                        <template slot="desc">
                            开启状态
                        </template>
                    </Alert>
                    <Button class="custom-btn" type="success" :disabled="!state" @click="pushMessage()">发送通知</Button>
                </div>
            </div>
        </Card>
    </section>
</template>
<script>
import Card  from '../../components/base/card/card.vue'
// https://github.com/Nickersoft/push.js/issues/119 如若异常
import Push from 'push.js'
export default {
    components:{
        Card
    },
    data(){
        return {
            state:false
        }
    },
    created(){
        // 获取当前浏览器是否有通知权限
        this.state = Push.Permission.has();
    },
    mounted(){
        Push.Permission.request(function(){
        },()=>{
             this.$Notice.warning({
                title: '通知权限',
                desc: '通知权限为禁用状态'
            });
        });
    },
    methods:{
        pushMessage(){
            let that = this;
            Push.create("嗨，你好", {
                body: "我是vipbic，你收到了1条新的通知",
                icon: 'https://www.vipbic.com/public/img/logo.png',
                onClick: ()=> {
                    window.focus();
                    that.successMessage();
                }
            });
        },
        successMessage(){
           this.$Notice.success({
                title: '通知提醒',
                desc: '您刚点了通知提醒'
            });
        }
    }
}
</script>
<style lang="less" scoped>
    .center{
        display: flex;
        justify-content:space-between;
        flex-direction: column;
        text-align: left;
    }
    .custom-btn{
        padding: 5px 10px;
    } 
</style>
