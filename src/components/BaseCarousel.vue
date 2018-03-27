<template>
    <div class="block">
        <div class="head">
            <span class="left">{{value.title}}</span>
            <span class="right" @click="more">更多</span>
        </div>
        <ul ref="ul" style="left: 0">
            <a-mov v-for="item in value.items" :key="item.id" :item="item"/>
        </ul>
    </div>
</template>

<script>
    import AMov from './BaseSingle.vue';  // 电影信息组件
    
    export default {
        props: ['value'],
        data() {
            return {
                startX: 0,
                endX: 0
            }
        },  
        methods: {
            start(e) {
                e.preventDefault();
                this.startX = e.targetTouches[0].pageX;
            },
            move(e) {
                e.preventDefault();
                this.endX = e.targetTouches[0].pageX;

                var ul = this.$refs.ul;
                var dis = this.endX - this.startX;

                if(dis > 15) {
                    console.log('right');
                    if(parseInt(ul.style.left) >= 0) {
                        ul.style.left = 0;
                        console.log("it's start.");
                        return;
                    } else {
                        ul.style.left = (parseInt(ul.style.left)+dis) + 'px';
                        console.log('dis:'+dis+'  '+ul.style.left);
                    }
                } else if(dis < -15) {
                    console.log('left');
                    if(parseInt(ul.style.left) <= -(this.value.items.length-3)*100) {
                        ul.style.left = (this.value.items.length-3)*100+'px';
                        console.log("it's end."); 
                        return;
                    } else {
                        ul.style.left = (parseInt(ul.style.left)+dis) + 'px';
                        console.log(ul.style.left);
                    }
                }
            
            },
            more() {
                this.$emit('more');
            }
        },
        components: {
            AMov
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
    ul {
        display: flex;
        padding: 15px 0;
        position: relative; 
    }
}
</style>
