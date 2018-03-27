<template>
    <div class="movSubject">
        <loading :status="loading" />
        <h1>{{info.title}}</h1>
        <section class="info">
            <div class="left">
                <p class="score">
                    <span 
                        v-for="(s, index) in star" 
                        :key="index" 
                        :class="{star: starnum>index}">
                    </span>
                    {{info.rating.average}}
                </p>
                <p class="info">{{item.info}}</p>
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
        <!-- <div class="introduct">
            <h2>{{title}}的简介</h2>
            <p ref="p"><span>{{introduct}}</span><a @click="disAll" v-show="show">...<span>(展开)</span></a></p>
        </div> -->
    </div>
</template>

<script>
    import Loading from './BaseLoading.vue'
    import {mapActions, mapState} from 'vuex';

    export default {
        data() {
            return {
                star: ['','','','',''], 
                loading: true,
                show: true,
                item: {
                    info: ' 92分钟 / 喜剧 / 冒险 / 家庭 / 罗伯特·文斯(导演) / 麦肯泽·摩斯 / 凯特林·马希尔 / 杰德·瑞斯 / 2018-03-24(中国大陆) 上映',
                },
                look: ['想看', '看过'],
                introduct: '在《萌犬好声音》的世界里，狗狗不仅学会了说话，还可以拥有动人的歌声。泰妮——一只可爱的约克夏是小主人洛最好的伙伴，也是一只热爱歌唱的狗狗，梦想在歌唱比赛的舞台上大放异彩。一场意外让她从家中走失，为了找回主人，也为了实现自己的音乐梦想，泰妮踏上了既欢乐又充满挑战的回家路。冒险的旅途中，步步惊险却又时时爆笑。在众多朋友的帮助下，泰妮看到了更广阔的世界，也收获了成长与珍贵的友情。',
            }
        },
        beforeCreate() {
            var title = this.$route.query.name;
            this.$store.dispatch('movFindByName', title).then(()=> {
                this.loading = false;
            });
        },   
        methods: {
            ...mapActions([
                'movFindByName'
            ]),
            disAll() {
                this.$refs.p.style.height = 'auto';
                this.show = false;
            }
        },
        computed: {
            ...mapState({
                info: state => {
                    var temp = state.movie.findByName[0];
 
                    return state.movie.findByName[0];
                }
            }),
            title: function () { 
                return this.$route.query.name;
            },  
            starnum() {
                return Math.floor(this.info.rating.stars/10);
            }
        },
        components: {
            Loading,
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

 }
 </style>
 