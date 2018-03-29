<template>
    <div id="movie">
        <loading :status="loading" />
        <base-carousel :value="hot" @more='toMore("movHot")' />
        <base-carousel :value="top250" @more='toMore("movTop250")' />
        <base-carousel :value="news" @more='toMore("movNew")' />
        <base-find :finds="finds" />
        <base-classfiy :classfies="classfies"/>
        <BaseFooter />
    </div>
</template>

<script>
    import Loading from '../base/BaseLoading.vue'  // 加载页面
    import BaseCarousel from '../base/BaseCarousel.vue'  // 系列电影展示组件
    import BaseFind from '../base/BaseFind.vue'  // 发现好电影
    import BaseClassfiy from '../base/BaseClassfiy.vue'  // 底部分类
    import BaseFooter from '../base/BaseFooter.vue'  // 底部
    import { mapState, mapActions } from 'vuex'

    export default {
        beforeCreate() {
            window.scrollTo(0, 0);
            this.$store.dispatch('movHot').then(()=> {
                this.hotLoad = true;
            });
            this.$store.dispatch('movTop250').then(()=> {
                this.topLoad = true;
            });
            this.$store.dispatch('movNew').then(()=> {
                this.newLoad = true;
            });
        },  
        data() {
            return { 
                typeName:'',
                hotLoad: false,
                topLoad: false,
                newLoad: false,
                classfies: {
                    title: '分类浏览',
                    items: ['经典','冷门佳片','豆瓣高分','动作','喜剧','爱情','悬疑','恐怖','科幻','治愈','文艺','成长','动画','华语','欧美','韩国','日本',''],
                },
                finds: {
                    title: '发现好电影',
                    items: [
                        {id: '0', name: '同时入选IMDB250和豆瓣电影250的电影', color: '#FFC46C'},
                        {id: '1', name: '带你进入不正常的世界', color: '#42BD56'},
                        {id: '2', name: '用电【影】来祭奠逝去的岁月', color: '#4F9DED'},
                        {id: '3', name: '女孩们的故事【电影】', color: '#CC3344'},
                        {id: '4', name: '使用 App 【找电影】功能', color: '#42BD56'},
                        {id: '5', name: '科幻是未来的钥匙——科幻启示录【科幻题材】', color: '#FF4055'},
                        {id: '6', name: '美国生活面面观', color: '#FFAC2D'},
                        {id: '7', name: '2015终极期待', color: '#3BA94D'},
                        {id: '8', name: '经典韩国电影——收集100部', color: '#2384E8'},
                    ]
                }
            };
        },
        computed: { 
            ...mapState({
                hot: state => state.movie.hot,
                top250: state => state.movie.top250,
                news: state => state.movie.news,
            }),
            loading() {  // 确保请求成功并且内容展示在页面上
                if(this.hot.items.length) {
                    this.hot.items.length = 7;
                }
                if(this.top250.items.length) {
                    this.top250.items.length = 7;
                }
                if(this.news.items.length) {
                    this.news.items.length = 7;
                }

                return !(this.hotLoad&&this.topLoad&&this.newLoad 
                        && this.hot.items.length!=0 && this.top250.items.length!=0 && this.news.items.length!=0);
            }
        },
        methods: {
            ...mapActions([
                'movHot',
                'movTop250',
                'movNew'
            ]),  
            toMore(typeName) { 
                this.$router.push({
                    path: 'movie/more',
                    name: 'movieMore',
                    query: { // 路由传参 
                        type: 'more',
                        tag: typeName
                    } 
                })
            }
        },
        components: {
            BaseCarousel,
            BaseClassfiy,
            BaseFind,
            BaseFooter,
            Loading,
        }
    }
</script>

<style lang="less">
#movie {
    background: #fff;
    padding-left: 18px;
    h1 {
        height: 24px;
        line-height: 24px;
        font-size: 1.7rem;
        font-weight: 500;
    }
}
</style>
