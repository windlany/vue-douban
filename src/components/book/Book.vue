<template>
    <div class="book">
        <loading :status="loading" />
        <base-carousel :value="emotion" @more='toMore("情感")' />
        <base-carousel :value="improvement" @more='toMore("励志")' />
        <base-find :finds="finds" />
        <base-classfiy :classfies="classfies"/>
        <BaseFooter />
    </div>
</template>

<script>
    import Loading from '../base/BaseLoading.vue'
    import BaseCarousel from '../base/BaseCarousel.vue'  // 系列电影展示组件
    import BaseFind from '../base/BaseFind.vue'  // 发现好电影
    import BaseClassfiy from '../base/BaseClassfiy.vue'  // 底部分类
    import BaseFooter from '../base/BaseFooter.vue'  // 底部
    import { mapState, mapActions } from 'vuex'

    export default {
        data() {
            return {
                emotionLoad: false,
                improvementLoad: false,
                classfies: {
                    title: '分类浏览',
                    items: ['小说','爱情','历史','外国文学','青春','励志','随笔','传记','推理','旅行','奇幻','经管'],
                },
                finds: {
                    title: '发现好图书',
                    items: [
                        {id: '0', name: '小波看书', color: '#FFC46C'},
                        {id: '1', name: '村上春树周边', color: '#42BD56'},
                        {id: '2', name: '我凭名字认定了你', color: '#4F9DED'},
                        {id: '3', name: '不可饶恕的女人们', color: '#CC3344'},
                        {id: '4', name: '爱欲书', color: '#2384E8'},
                        {id: '5', name: '他们还写侦探小说', color: '#FF4055'},
                        {id: '6', name: '人生识字始忧患', color: '#FFAC2D'},
                        {id: '7', name: '诗歌书店', color: '#3BA94D'},
                    ]
                }
            }
        },
        beforeCreate() {
            window.scrollTo(0, 0);
            this.$store.dispatch('bookTag', '情感').then(()=> {  // 获取情感类书籍
                this.emotionLoad = true;
            });
            this.$store.dispatch('bookTag', '励志').then(()=> {  // 获取励志类书籍
                this.improvementLoad = true;
            });
        },
        methods: {
            ...mapActions(['bookTag', 'bookId']),
            toMore(tag) {
                this.$router.push({
                    
                });
            }
        },
        computed: {
            ...mapState({
                emotion: state=> state.book.emotionBooks,
                improvement: state=> state.book.books,
            }),
            loading() {
                if(this.emotion.items.length) {
                    this.emotion.items.length = 7;
                }
                if(this.improvement.items.length) {
                    this.improvement.items.length = 7;
                }
                return !(this.emotionLoad && this.improvementLoad
                            && this.emotion.items.length!=0 && this.improvement.items.length!=0);
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
.book {
    background: #fff;
    padding-left: 18px;
    h1 {
        height: 24px;
        line-height: 24px;
        font-size: 1.7rem;
        font-weight: 500;
    }
    .find ul {
        width: 700px;
        li {
            font-size: 1.4rem;
        }
    }
}
</style>
