<template>
    <div class="actor">
        <base-loading :status="loading" />
        <div class="more" v-show="showMore">
            <div class="hd">
                <a @click="hide">取消</a>
                <span>影人基本资料</span>
            </div>
            <ul>
                <li>
                    <div class="title">简体中文名</div>
                    <div>{{actor.name}}</div>
                </li>
                <li><div class="title">英文名</div><div>{{actor.name_en}}</div></li>
                <li><div class="title">出生地</div><div>{{actor.born_place}}</div></li>
                <li>
                    <div class="title">更多中文名</div>
                    <div>
                        <span v-for="(name, index) in actor.aka" :key="index">{{name}}、</span>
                    </div>
                </li>
            </ul>
        </div>
        <h1>{{actor.name}}<span v-show="actor.name_en"> - {{actor.name_en}}</span></h1>
        <section>
            <div class="left">
                <div class="score"></div>
                <p class="info">
                    <span>性别：{{actor.gender}}</span>
                    <span>出生地：{{actor.born_place}}</span>
                    更多中文名称：
                    <span v-for="(name, index) in actor.aka" :key="index">{{name}}</span>
                </p>
                <p class="moreInfo" @click="moreInfo">更多资料</p>
            </div>
            <div class="right">
                <img :src="actor.avatars.medium">
            </div>
        </section>

        <ul class="look">
            <li>收藏</li>
        </ul>
        
        <!-- <div class="introduct">
            <h2>影人介绍</h2>
            <p ref="p"></p>
        </div> -->

        <div class="work">
            <h2>个人作品</h2>
            <vue-carousel>
                <a-mov v-for="item in actor.works" :key="item.id" :item="item.subject"/>
            </vue-carousel>
        </div>

        <base-footer />
    </div>
</template>

<script>
    import VueCarousel from '../base/vue-carousel.vue'
    import AMov from '../base/BaseSingle.vue';  // 电影信息组件
    import BaseLoading from '../base/BaseLoading.vue'
    import BaseFooter from '../base/BaseFooter.vue'

    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                load: true,
                showMore: false
            }
        },
        beforeCreate() {
            window.scrollTo(0, 0);
            this.$store.dispatch('movActor', this.$route.query.id).then(function () {
                this.load = true;
            });
        },
        methods: {
            ...mapActions(['movActor']),
            moreInfo() {
                this.showMore = true;
            },
            hide() {
                this.showMore = false;
            }
        },
        computed: {
            ...mapState({
                actor: state=> state.movie.actor
            }),
            loading() {
                return !(this.load && this.actor.name);
            }
        },
        components: {
            BaseLoading,
            BaseFooter,
            AMov,
            VueCarousel
        }
    }    
</script>

<style lang="less">
.actor {
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
    .more {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background: #fff;
        z-index: 6;
        .hd {
            height: 45px;
            line-height: 45px;
            text-align: center;
            border-bottom: 1px solid #efefef;
            a {
                color: #42bd56;
                font-size: 15px;
                position: absolute;
                left: 18px;
            }
            span {
                font-size: 20px;
                color: #333;
            }
        }
        ul {
            padding-top: 40px;
            li {
                font-size: 15px;
                padding: 15px 0;
                margin-left: 18px;
                border-bottom: 1px solid #efefef;
                display: flex; 
                .title {
                    flex: 3;
                    height: 100%;
                    color: #aaa;
                } 
                div {
                    flex: 7;
                }
            }
        }
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
            .info {
                margin-top: 15px;
                font-size: 14px;
            }
            .moreInfo {
                color: #42bd56;
            }
        }
        img {
            width: 100px;
            height: 141px;
        }
    }
    .look {
         margin-bottom: 30px;
         li {
             width: 34%;
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

}
</style>
