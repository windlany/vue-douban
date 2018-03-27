<template>
    <div class="movSubject">
        <loading :status="loading" />
        <h1>{{info.title}}</h1>

        <section class="info">
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
                    <p>{{info.ratings_count}}人评价</p>
                </div>
                <p class="info">
                    <!-- <span>{{info.durations}}</span> -->
                    <span v-for="(con, index) in info.genres" :key="index">{{con}} / </span>
                    <span v-for="(con, index) in info.directors" :key="index+info.genres.length">{{con.name}}(导演) / </span>
                    <span v-for="(con, index) in info.casts" :key="index+info.directors.length+info.genres.length">{{con.name}} / </span>
                    <span>{{info.year}}(中国大陆)上映</span>
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

        <div class="actors">
            <h2>影人</h2>
            <ul>
                <li v-for="(person, index) in info.directors" :key="index">
                    <img :src="person.avatars.medium" :alt="person.alt">
                    <p class="name">{{person.name}}</p>
                    <p>导演</p>
                </li>
                <li v-for="(cast, index) in info.casts" :key="index+info.directors.length">
                    <img :src="cast.avatars.medium" :alt="cast.alt">
                    <p class="name">{{cast.name}}</p>
                    <p>演员</p>
                </li>
            </ul>
        </div>

        <div class="moreTag">
            <h2>查看更多豆瓣高分电影</h2>
            <span>
                <router-link :to="{name:'movieMore', query: {type: 'classic', tag: info.year}}">{{info.year}}</router-link>
            </span>
            <span v-for="(con, index) in info.genres" :key="index">
                <router-link :to="{name:'movieMore', query: {type: 'classic', tag: con}}">{{con}}</router-link>
            </span>
             <span v-for="(con, index) in info.countries" :key="index+info.genres.length">
                <router-link :to="{name:'movieMore', query: {type: 'classic', tag: con}}">{{con}}</router-link>
            </span>
        </div>
        <!-- 剧照以及评论需要许可，so... -->
        <base-footer />
    </div> 
</template>  

<script>
    import Loading from './BaseLoading.vue'
    import BaseFooter from './BaseFooter.vue'
    import {mapActions, mapState} from 'vuex';

    export default {
        data() {
            return {
                star: ['','','','',''], 
                loading: true,
                show: true, 
                look: ['想看', '看过'],
            }
        },
        beforeCreate() {
            var id = this.$route.query.id; 
            this.$store.dispatch('movInfo', id).then(()=> {
                this.loading = false;
            });  
            // this.$store.dispatch('movPhoto', id).then(()=> {
            //     this.loading = false;
            // });  
        },   
        methods: {
            ...mapActions([
                'movFindByName',
                'movInfo',
                'movPhoto',
            ]),
            disAll() {
                this.$refs.p.style.height = 'auto';
                this.show = false;
            }
        },
        computed: {
            ...mapState({ 
                info: state=> state.movie.movInfo,
                // photos: state=> state.movie.movPhoto,
            }), 
            starnum() {
                return Math.floor(this.info.rating.stars/10);
            }
        },
        components: {
            Loading,
            BaseFooter,
        }
    }
</script>

 <style lang="less">
 .movSubject {
    padding: 0 18px;
    background-color: #fff;
    h1 {
         height: 32px;
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
    .actors {
        margin-bottom: 30px;
        ul {
            display: flex;
            li {
                flex-shrink: 0;
                width: 75px;
                margin-right: 10px;
                overflow: hidden;
                img {
                    width: 100%;
                }
                p {
                    color: #aaa;
                    font-size: 14px;
                    line-height: 1.5;
                    text-align: center;
                    margin-top: 8px;
                }
                .name {
                    color: #494949;
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
 