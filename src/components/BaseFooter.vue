<template>
    <div class="footer">
        <img src="/static/img/douban-app-logo.png">
        <div>
            <h2>豆瓣</h2>
            <span>我们的精神角落</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="less">
.footer {
    float: left;
    width: 100%;
    height: 96px;
    margin-top: 30px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
    img {
        width: 48px;
        height: 48px;
        margin-right: 12px;
    }
    h2 {
        font-weight: normal;
        font-size: 24px;
        line-height: 28px;
    }
    span {
        line-height: 20px;
        white-space: pre;
        font-size: 14px;
    }
}
</style>

