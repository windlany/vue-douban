<template>
    <div class="carousel">
        <ul ref="ul" style="left: 0;"
            @touchstart="touchStart"
            @touchmove="touchmove"
            @touchend="touchend">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                startX: '',
                endX: ''
            }
        },
        methods: {
            touchStart(ev) {
                ev = ev || window.event;
                this.startX = ev.touches[0].pageX;
            },
            touchmove(ev) {
                ev = ev || window.event;
                this.endX = ev.touches[0].pageX;
            },
            touchend(ev) {
                ev = ev || window.event;
                
                var dis = this.endX - this.startX;  
                var left = parseInt(this.$refs.ul.style.left);

                if(dis > 0 && left <= 0) { // right
                    this.$refs.ul.style.left = (left+dis) > 0 ? 0 : (left+dis)+'px';
                } else {  // left
                    this.$refs.ul.style.left = (left+dis) + 'px';
                }
            } 
        }
    }
</script>

<style lang="less">
.carousel {
    width: 100%;
    overflow: hidden;
    ul {
        display: flex;
        padding: 15px 0;
        position: relative;
    }
}
</style>
