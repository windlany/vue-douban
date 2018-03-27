<template>
    <div class="find">
        <h1>{{finds.title}}</h1>
        <ul>
            <li v-for="find in finds.items" :key="find.id" :style="{borderColor: find.color}">
                <router-link to="/" :style="{color: find.color}">{{find.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['finds'],
        data() {
            return {

            }
        }
    }
</script>

<style lang="less">
.find {
    ul {
        padding: 15px 0 30px 0;
        height: 121px;
        width: 1300px;
        display: flex;
        flex-wrap: wrap;
        li {
            flex-shrink: 0;
            margin: 0 8px 8px 0;
            padding: 0 25px;
            border-radius: 5px;
            border: 1px solid;
            height: 50px;
            line-height: 50px;
            letter-spacing: .1rme;
            overflow: auto;
            text-align: center;
            font-size: 1.7rem;
        }
    }
}
</style>
