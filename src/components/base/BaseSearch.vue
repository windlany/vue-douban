<template>
    <div class="block">
        <span>{{items.title}}</span>
        <ul ref="ul">
            <li v-for="(item, index) in items.items" :key="index">
                <a @click="toSignle(item.id)">
                    <img :src="item.image || item.images.medium">
                    <div>
                        <span>{{item.title}}</span>
                        <div class="score" v-if="item.rating.average != 0">
                            <span 
                                v-for="(s, index) in star" 
                                :key="index" 
                                :class="{star: item.rating.average/2-0.5 > index}">
                            </span>
                            {{item.rating.average}}
                        </div>
                        <p v-else>暂无评分</p>
                    </div>
                </a>
            </li>
        </ul>
        <p class="more" v-show="items.items.length > 1" @click="more" ref="p">
            更多{{items.title}}结果({{items.items.length}})
        </p>
    </div>    
</template>

<script>
    export default {
        props: ['items'],
        data() {
            return {
                star: ['','','','','']
            }
        },
        methods: { 
            more() {
                this.$refs.ul.style.overflow = 'initial';
                this.$refs.ul.style.maxHeight = 'none';
                this.$refs.p.style.display = 'none';
            },
            toSignle(id) {
                var name;

                if(this.items.title == '音乐') {
                    name = 'musicSubject';
                } else {
                    name = this.items.title == '影视' ? 'subject' : 'bookSubject';
                }

                this.$router.push({
                    name,
                    query: {
                        id
                    }
                });

            }
        }
    }
</script>

<style lang="less">
.block {
    padding: 1px 18px 0px 18px;
    margin-top: 30px;
    span {
        font-size: 15px;
        color: #aaa;
        line-height: 15px;
    }
    ul {
        max-height: 186px;
        overflow: hidden;
        li {
            height: 61px;
            box-sizing: border-box;
            border-bottom: 1px solid #F2F2F2;
            a {
                display: block;
                display: flex;
                img {
                    width: 40px;
                    height: 36px;
                    padding: 10px 0;
                }
                div {
                    padding: 14px 0;
                    box-sizing: border-box;
                    padding-left: 10px;
                    color: #aaa;
                    span {
                        max-width: 275px;
                        font-size: 17px;
                        color: #494949;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        display: inline-block;
                    }
                    .score {
                        color: #aaa;
                        padding: 0;
                        padding-top: 5px;
                        span {
                            display: inline-block;
                            width: 10px;
                            height: 10px;
                            background-size: cover;
                            background-image: url(/static/img/unstar.png);
                            background-position: center center;
                        }
                        span:last-child {margin-right: 2px;}
                        .star {
                            background-image: url(/static/img/star.png);
                        }
                    }
                    p {
                        padding-top: 5px;
                    }
                }
            }
        }
    }
    .more {
        height: 20px;
        padding: 10px 0;
        padding-left: 50px;
        color: #42bd56;
        font-size: 15px;
        border-bottom: 1px solid #F2F2F2;
    }
}
</style>
