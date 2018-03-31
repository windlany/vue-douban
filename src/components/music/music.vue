<template>
    <div class="book">
        <loading :status="loading" />
        <base-carousel :value="emotion" @more='toMore("经典")' @toSignle="toSignle" />
        <base-carousel :value="improvement" @more='toMore("粤语")' @toSignle="toSignle" />
        <base-find :finds="finds" @toClass="toClass" />
        <base-classfiy :classfies="classfies" @toClass="toClass" />
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
                    items: ['流行','摇滚','民谣','独立','华语','欧美','日本','韩国'],
                },
                finds: {
                    title: '发现好音乐',
                    items: [
                        {id: '0', name: '当我们听爵士乐，我们在听什么', color: '#FFC46C', tag: '爵士'},
                        {id: '1', name: '如果你也喜欢日本的樱花', color: '#42BD56', tag: '日本'},
                        {id: '2', name: 'someone like you', color: '#4F9DED', tag: '欧美'},
                        {id: '3', name: '走进粤语', color: '#CC3344', tag: '粤语'},
                        {id: '4', name: '你知道Eason吗', color: '#2384E8', tag: '陈奕迅'},
                        {id: '5', name: '他们还唱民谣', color: '#FF4055', tag: '民谣'},
                        {id: '6', name: '我们都爱摇滚，年轻要任性', color: '#FFAC2D', tag: '摇滚'},
                    ]
                }
            }
        },
        beforeCreate() {
            window.scrollTo(0, 0);
            this.$store.dispatch('musicTag', '经典').then(()=> {  // 获取情感类书籍
                this.emotionLoad = true;
            });
            this.$store.dispatch('musicTag', '粤语').then(()=> {  // 获取励志类书籍
                this.improvementLoad = true;
            });
        },
        methods: {
            ...mapActions(['musicTag', 'musicId']),
            toMore(tag) {
                this.$router.push({
                    name: 'musicMore',
                    query: {
                        type: 'music',
                        tag: tag
                    }
                });
            },
            toClass(tag) {
                this.$router.push({
                    name: 'musicClassfiy',
                    query: {
                        type: 'musicClass',
                        tag
                    }
                });
            },
            toSignle(id) {
                this.$router.push({
                    name: 'musicSubject',
                    query: {
                        id
                    }
                });
            }
        },
        computed: {
            ...mapState({
                emotion: state=> state.music.emotionMusics,
                improvement: state=> state.music.improvementMusics,
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
