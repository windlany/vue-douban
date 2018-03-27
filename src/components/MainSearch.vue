<template>
    <div id="search">
        <header>
            <span @click='hide'>关闭</span>
            <input type="text">
        </header>
        <div>
            <ul class="link">
                <li v-for="item in items" :key="item.id">
                    <router-link to='item.route'>
                        <div :style="{color: item.color}">{{item.type}}</div>
                        <span>{{item.sub}}</span>
                    </router-link>
                </li>
            </ul>
            <ul class="event">
                <li>注册账号</li>
                <li>登录豆瓣</li>
                <li>使用桌面版</li>
                <li>使用豆瓣App</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {id: 0, type: '电影', sub: '影院热映', route: '', color: 'rgb(35, 132, 232)'},
                {id: 1, type: '电视', sub: '正在热播', route: '', color: 'rgb(122, 106, 219)'},
                {id: 2, type: '图书', sub: '畅销排行', route: '', color: 'rgb(159, 120, 96)'},
                {id: 3, type: '同城', sub: '周末活动', route: '', color: 'rgb(230, 70, 126)'},
                {id: 4, type: '小组', sub: '志趣相投', route: '', color: 'rgb(42, 184, 204)'},
                {id: 5, type: '音乐', sub: '新碟榜', route: '', color: 'rgb(244, 143, 46)'},
                {id: 6, type: '阅读', sub: '电子书', route: '', color: 'rgb(159, 120, 96)'},
                {id: 7, type: '游戏', sub: '虚拟世界', route: '', color: 'rgb(87, 116, 197)'},
                {id: 8, type: '应用', sub: '玩手机', route: '', color: 'rgb(89, 108, 221)'},
                {id: 9, type: '广播', sub: '友邻动态', route: '', color: 'rgb(225, 100, 77)'},
                {id: 10, type: 'FM', sub: '红心歌单', route: '', color: 'rgb(64, 207, 169)'},
                {id: 11, type: '市集', sub: '购买原创', route: '', color: 'rgb(66, 189, 86)'},
            ],
        }
    },
    methods: {
        hide() {
            this.$emit('hide');
        }
    }
}
</script>

<style lang="less" scoped>
#search {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    header {
        height: 62px;
        padding: 15px 18px 15px 60px;
        margin-bottom: 22px;
        box-sizing: border-box;
        span {
            color: rgb(66, 189, 86);
            font-size: 16px;
            position: absolute;
            top: 20px;
            left: 18px;
        }
        input {
            width: 100%;
            height: 31px;
            font-size: 1.4rem;
            background: url(/static/img/search2.png) no-repeat 50% #f3f3f3;
            background-size: 17px;
            border: none;
            padding-left: 5px;
            box-sizing: border-box;
        }
        input:focus { background-image: none; }

    } 
    .link li {
        display: inline-block;
        width: 33.3%;
        height: 70px;
        text-align: center;
        vertical-align: middle;
        box-sizing: border-box;
        div {
            font-size: 24px;
        }
        span {
            color: #999;
            font-size: 12px;
            letter-spacing: 1px;
        }
    } 
    .event li {
        display: inline-block;
        width: 49%;
        height: 47px;
        box-sizing: border-box;
        color: rgb(66, 189, 86);
        font-size: 15px;
        text-align: center;
        line-height: 47px;
    }
}
</style>
