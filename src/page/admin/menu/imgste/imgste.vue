<template>
    <section>
        <Card title="图片预览">
            <div slot="center" class="center">
                <div class="image">
                    <div v-for="(image, i) in images" >
                        <img :src="image" :key="i" @click="index = i">
                    </div>
                </div>
                <div>
                    <!-- <vue-gallery-slideshow :images="images" :index="index" @close="index = null"></vue-gallery-slideshow> -->
                </div>
            </div>
        </Card>
    </section>
</template>
<script>
import Card  from '../../common/component/base/card/card.vue';
// https://github.com/KitchenStories/vue-gallery-slideshow 组价链接
// import VueGallerySlideshow from 'vue-gallery-slideshow';
export default {
    components:{
        Card
    },
    data(){
        return {
            images: [
                'https://placekitten.com/801/800',
                'https://placekitten.com/802/800',
                'https://placekitten.com/803/800',
                'https://placekitten.com/804/800',
                'https://placekitten.com/805/800',
                'https://placekitten.com/806/800',
                'https://placekitten.com/807/800',
                'https://placekitten.com/808/800',
                'https://placekitten.com/809/800',
                'https://placekitten.com/810/800'
            ],
            index: null
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
    .image{
        display: flex;
        align-items: center;
        >div{
            width: 50px;
            overflow: hidden;
            display: inline-block;
            img{
                border-radius: 8px;
                width: auto;
                height: auto;
                max-width: 85%;
                max-height: 85%;
            }
        }
    }
</style>
