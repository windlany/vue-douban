<template>
    <div class="classfiy">
        <h1>{{classfies.title}}</h1>
        <ul>
            <li v-for="(classfiy, index) in classfies.items" :key="index">
                <router-link :to="{name:'movieMore', query: {type: 'classic', tag: classfiy}}">{{classfiy}}</router-link>
                <span v-if="classfiy"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['classfies'],
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="less">
.classfiy {
    ul {
        padding-bottom: 30px;
        margin-top: 18px;
        display: flex;
        flex-wrap: wrap;
        border-top: 1px solid #eee;
        li {
            flex-shrink: 0;
            display: flex;
            justify-content: space-between;
            width: 50%;
            height: 42px;
            line-height: 42px;
            padding: 0 18px;
            box-sizing: border-box;
            border: 1px solid #eee;
            border-top: none;
            border-left: none;
            color: #ccc;
            a {
                color: #42bd56;
                font-size: 1.4rem;
                width: 135px;
            }
            span {
                width: .7rem;
                height: .7rem;
                border-right: 1px solid #ccc;
                border-top: 1px solid #ccc;
                transform: rotate(45deg);
                margin-top: 13px;
            }
        }
        li:last-child {
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
        }
    }
}
</style>
