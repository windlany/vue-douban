<template>
    <div class="carousel">
        <ul ref="ul" style="left: 0;"
            @click="click"
            @touchstart="touchStart"
            @touchmove="touchmove">
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
            click(ev) {
                ev = ev || window.event;
                ev.preventDefault();           
            },
            touchStart(ev) {
                ev = ev || window.event;
                this.startX = ev.touches[0].pageX;
            },
            touchmove(ev) {
                ev = ev || window.event;
                this.endX = ev.touches[0].pageX;

                var dis = this.endX - this.startX;  
                var left = parseInt(this.$refs.ul.style.left);

                if(dis > 0 && left <= 0) { // right
                    this.$refs.ul.style.left = (left+10) > 0 ? 0 : ((left+10))+'px';
                } else {  // left
                    this.$refs.ul.style.left = (left-10) < -400 ? left : (left-10) + 'px';
                } 
            }, 
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
