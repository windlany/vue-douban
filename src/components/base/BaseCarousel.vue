<template>
    <div class="block">
        <div class="head">
            <span class="left">{{value.title}}</span>
            <span class="right" @click="more">更多</span>
        </div>
        <vue-carousel>
            <a-mov v-for="item in value.items" :key="item.id" :item="item"/>
        </vue-carousel>
    </div>
</template>

<script>
    import AMov from './BaseSingle.vue';  // 电影信息组件
    import VueCarousel from './vue-carousel.vue'
    
    export default {
        props: ['value'],
        created() {
            console.log(this.value);
        },
        data() {
            return {
                startX: 0,
                endX: 0
            }
        },  
        methods: { 
            more() {
                this.$emit('more');
            }
        },
        components: {
            AMov,
            VueCarousel
        }
    }
</script>

<style lang="less">
.block {
    padding-top: 10px;
    .head {
        height: 24px;
        display: flex;
        justify-content: space-between;
        padding-right: 18px;
        .left {
            font-size: 1.7rem;
        }
        .right {
            font-size: 1.4rem;
            color: #42bd56;
        }
    } 
}
</style>
