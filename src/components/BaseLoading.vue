<template>
    <div class="loading" v-show="status">
        <i class="fa fa-spin fa-spinner"></i>
        小豆正在努力奔跑中~
    </div>
</template>

<script>
    export default {
        props: ['status'], 
        data() {
            return {};
        }
    }
</script>

<style lang="less">
.loading {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 47px;
    left: 0;
    z-index: 5;
    background-color: rgba(255, 255, 255, 0.85);
    line-height: 70vh;
    text-align: center;
    font-size: 1.5rem;
    color: #a2a2a2;
}
</style>
