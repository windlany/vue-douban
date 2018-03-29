<template>
    <li class="single" @click="signleInfo">
        <div class="img" :style="{backgroundImage: 'url('+item.images.medium+')'}"></div>
        <p class="title">{{item.title}}</p>
        <div class="score">
            <div v-if="item.rating.average != 0">
                <span 
                    v-for="(s, index) in star" 
                    :key="index" 
                    :class="{star: starnum > index}">
                </span>
                {{item.rating.average}}
            </div>
            <div v-else>
                暂无评分
            </div>
        </div>
    </li> 
</template>

<script>
    export default {
        props: ['item'],
        data() {
            return {
                star: ['', '', '', '', '']
            }
        },  
        methods: {
            signleInfo() {
                this.$router.push({
                    name: 'subject', 
                    query: {
                        id: this.item.id,
                    }
                });
            }
        },
        computed: {
            starnum() {
                if(this.item.rating.stars)
                    return Math.floor(this.item.rating.stars/10);
                else if(this.item.rating.average)
                    return Math.floor(this.item.rating.average/2);
                else {
                    
                }
            }
        }
    }
</script>

<style lang="less">
.single {
    width: 100px;
    height: 187px;
    box-sizing: border-box;
    flex-shrink: 0;
    vertical-align: middle;
    margin-right: 7px;
    .img {
        height: 143px;
        background-size: cover;
        background-position: center center;
    }
    .title {
        padding: 4% 0;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 1.5rem;
        text-align: center;
    }
    .score {
        color: #aaa;
        text-align: center;
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
}
</style>
