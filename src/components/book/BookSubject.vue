<template>
    <div class="bookSubject">
        <loading :status="loading" />
        <h1>{{info.title}}</h1>

        <section>
            <div class="left">
                <div class="score">
                    <div>
                        <span 
                            v-for="(s, index) in star" 
                            :key="index" 
                            :class="{star: starnum>index}">
                        </span>
                        {{info.rating.average}}
                    </div>
                    <p>{{info.rating.numRaters}}人评价</p>
                </div>
                <p class="info">
                    <span style="color: #42bd56;" v-for="(author, index) in info.author" :key="index">{{author}}</span> / 
                    <span style="color: #42bd56;" v-for="(trans, index) in info.translator" :key="index+info.author.length">{{trans}}</span> / 
                    <span>{{info.publisher}}</span> / 
                    <span>{{info.pages}}</span>页 / 
                    <span>{{info.binding}}</span> / 
                    <span>{{info.price}}</span> / 
                    <span>{{info.pubdate}}</span>
                </p>
            </div>
            <div class="right">
                <img :src="info.images.medium" alt="info.alt">
            </div>
        </section>

        <ul class="look">
            <li v-for="(item, index) in look" :key="index">
                {{item}}
            </li>
        </ul>

        <div class="introduct">
            <h2>{{info.title}}的简介</h2>
            <p ref="p"><span>{{info.summary}}</span><a @click="disAll" v-show="show">...<span>(展开)</span></a></p>
        </div>

        <div class="moreTag">
            <h2>查看更多豆瓣高分好书</h2>
            <span v-for="(tag, index) in info.tags" :key="index">
                <router-link :to="{name: 'bookMore', query: {type: 'more', tag: tag.name}}">{{tag.name}}</router-link>
            </span>
        </div>

        <base-footer />
    </div>
</template>

<script>
    import Loading from '../base/BaseLoading.vue'
    import BaseFooter from '../base/BaseFooter.vue'

    import {mapState, mapActions} from 'vuex'

    export default {
        beforeCreate() {
            window.scrollTo(0, 0);
            var id = this.$route.query.id;

            this.$store.dispatch('bookId', id).then(()=> {
                this.load = true;
            });
        },
        data() {
            return {
                load: false,
                show: true,
                star: ['','','','',''],
                look: ['想读', '在读', '读过']
            }
        },
        methods: {
            ...mapActions(['bookId']),
            // 显示更多简介
            disAll() {
                this.$refs.p.style.height = 'auto';
                this.show = false;
            },

        },
        computed: {
            ...mapState({
                info: state=> state.book.bookInfo
            }),
            loading() {
                return !(this.load && this.info.title);
            },
            starnum() {
                // 评分星级
                return Math.floor(this.info.rating.average/2);
            },

        },
        components: {
            Loading,
            BaseFooter
        }
    }
</script>

<style lang="less">
.bookSubject {
padding: 0 18px;
    background-color: #fff;
    h1 {
         line-height: 32px;
         padding: 30px 0 5px 0;
         font-size: 24px;
         font-weight: 500;
    }
    h2 {
         height: 20px;
         margin-bottom: 15px;
         font-size: 15px;
         font-weight: 500;
         color: #aaa;
    }
    section {
        margin-bottom: 30px;
        display: flex; 
        .left {
            width: 215px;
            padding-right: 24px;
            font-size: 14px;
            line-height: 1.6;
            color: #494949;
            .score {
                height: 18px;
                line-height: 18px;
                font-size: 15px;
                text-align: left; 
                display: flex;
                span {
                    display: inline-block;
                    width: 13px;
                    height: 13px;
                    background-size: cover;
                    background-position: center center;
                    background-image: url(/static/img/unstar.png);
                }
                span:last-child {margin-right: 2px;}
                .star {
                    background-image: url(/static/img/star.png);
                }
                p {
                    color: #aaa;
                    margin-left: 20px;
                }
            }
            .info {
                margin-top: 15px;
                font-size: 14px;
            }
        }
        img {
            width: 100px;
            height: 140px;
        }
    }
    .look {
         margin-bottom: 30px;
         display: flex;
         li {
             flex-grow: 1;
             height: 30px;
             text-align: center;
             line-height: 30px;
             font-size: 15px;
             border: 1px solid #ffb712;
             color: #ffb712;
             border-radius: 3px;
             margin-left: 10px;
         }
    }
    .introduct {
        margin-bottom: 30px;
        p {
            height: 60px;
            overflow: hidden;
            font-size: 15px;
            color: #494949;
            position: relative;
            a {
                position: absolute;
                bottom: 0;
                right: 1px;
                background-color: #fff;
                span {
                    color: #42bd56;
                }
            }
        }
    } 
    .moreTag {
        margin: 30px 0;
        span {
            display: inline-block;
            margin: 10px 10px 0 0;
            font-size: 15px;
            a {
                line-height: 28px;
                border-radius: 28px;
                display: inline-block;
                text-align: center;
                background-color: #f5f5f5;
                padding: 0 12px;
                color: #494949;
            }
        }
    }
}
</style>
