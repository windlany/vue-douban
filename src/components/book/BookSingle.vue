<template>
    <li class="booksignle">
        <img :src="item.images.medium">
        <div class="info">
            <h3>{{item.title}}</h3>
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
            <p>
                <span v-for="(author, index) in item.author" :key="index">{{author}} / </span>
                <span>{{item.publisher}} / {{item.pubdate}}</span>
            </p>
        </div>
    </li>
</template>

<script>
    export default {
        props: ['item'],
        data() {
            return {
                star: ['','','','','']
            }
        },
        computed: {
            starnum() {
                return Math.floor(this.item.rating.average/2);
            }
        }
    }
</script>

<style lang="less">
.booksignle {
    height: 143px;
    padding: 20px 4%;
    display: flex;
    border-bottom: 1px solid #ccc;
    img {
        width: 100px;
        margin-right: 15px;
    }
    .info { 
        color: #9b9b9b;
        h3 {
            color: #494949;
            font-size: 17px;
            padding: 0 0 5px;
        }
        .score {
            padding-bottom: 5px;
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

}
</style>
