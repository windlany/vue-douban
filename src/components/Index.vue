<template>
    <div id="index">
        <ul class="nav">
            <li><router-link :to="{name: 'movieMore', query: {type: 'more', tag: 'movHot'}}" class='item'>影院热映</router-link></li>
            <li><router-link to='/' class='item'>我的</router-link></li>
            <li><router-link to='/' class='item'>豆瓣时间</router-link></li>
            <li><router-link to='/' class='item'>使用豆瓣App</router-link></li>
        </ul>
        <ul class="news">
            <li v-for="news in newss" :key="news.id">
                <div class="article">
                    <div class="img"></div>
                    <div>
                        <h1>{{news.title}}</h1>
                        <p>{{news.content}}</p>
                    </div>
                </div>
               <div class="editInfo">
                   <span>by {{news.name}}</span>
                   <span>来自栏目 {{news.source}}</span>
               </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newss: [
                    {id:0,title:'火华社长懵圈儿回归，揭秘娱乐圈巨头悬案',content:'不满毒评怒折手卡，惊天头围首度公开',name:'毛毛虫',source:'逸闻趣事'},
                    {id:1,title:'火华社长懵圈儿回归，揭秘娱乐圈巨头悬案',content:'不满毒评怒折手卡，惊天头围首度公开',name:'毛毛虫',source:'逸闻趣事'},
                    {id:2,title:'火华社长懵圈儿回归，揭秘娱乐圈巨头悬案',content:'不满毒评怒折手卡，惊天头围首度公开',name:'毛毛虫',source:'逸闻趣事'},
                    {id:3,title:'火华社长懵圈儿回归，揭秘娱乐圈巨头悬案',content:'不满毒评怒折手卡，惊天头围首度公开',name:'毛毛虫',source:'逸闻趣事'},
                ] 
            };
        },
        created() {
            this.toTop();
        },
        methods: {
            toTop() {
                window.scrollTo(0, 0);
            }
        }
    }
</script>

<style lang="less">
#index {
    background-color: #fff;
        padding: 0 18px;
        padding-top: 30px;
    .nav {
        background-color: #fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        li {
            display: inline-block;
            width: 49%;
            height: 44px;
            font-size: 15px;
            text-align: center;
            line-height: 20px;
            padding: 12px 0;
            margin-bottom: 5px;
            background: #f6f6f6;
            box-sizing: border-box;
            .item {
                display: inline-block;
                color: #494949;
                max-width: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                overflow: hidden;
            }
        }
    }
    .news {
        li {
            width: 100%;
            max-height: 180px;
            padding: 25px 0;
            font-size: 12px;
            box-sizing: border-box;
            border-bottom: 1px solid #f3f3f3;
            .article {
                width: 100%;
                max-height: 104px;
                box-sizing: border-box;
                margin-bottom: 10px;
                float: left;
                div {
                    h1 {
                        font-weight: 500;
                        font-size: 17px;
                        color: #494949;
                        margin-bottom: 6px;
                    }
                    p {
                        max-height: 52px;
                        overflow: hidden;
                        color: #aaa;
                        text-align: justify;
                    }
                }
                .img {
                    width: 25.6%;
                    height: 87px;
                    margin-left: 25px;
                    float: right;
                    background: url(https://img1.doubanio.com/img/files/file-1521629708.jpg) center center / cover no-repeat rgb(250, 250, 250);
                }
            }
            .editInfo {
                display: flex;
                width: 100%;
                color: #ccc;
                justify-content: space-between;
            }
        }
    }
}
</style>
