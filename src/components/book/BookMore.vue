<template>
    <div class="bookMore">
        <loading :status="loading" />
        <h1>{{val.title}}</h1>
        <ul>
            <a-book v-for="item in val.items" :key="item.id" :item="item"/>
        </ul>
    </div>
</template>

<script>
    import Loading from '../base/BaseLoading.vue'
    import ABook from './BookSingle.vue'
    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                load: false, 
                val: {
                    title: '',
                    items: []
                }
            }
        },
        beforeCreate() {
            window.scrollTo(0, 0);
            var type = this.$route.query.tag;
            this.$store.dispatch('bookTag', type).then(()=> {
                this.load = true;
                if(type == '情感') 
                    this.val = this.emotion;
                else 
                    this.val = this.books;
                console.log(this.val);
            });
        },
        methods: {
            ...mapActions(['bookTag']),
        },
        computed: {
            ...mapState({
                emotion: state=> state.book.emotionBooks,
                books: state=> state.book.books
            }),
            loading() {
                return !(this.load && this.val.items.length != 0);
            } 
        },
        components: {
            Loading,
            ABook,
        }
    }
</script>

<style lang="less">
.bookMore {
    background-color: #fff;
    padding: 0 7.5px;
    h1 {
        font-size: 24px;
        font-weight: 500;
        margin: 17px 0 6px 0;
        padding-left: 18px;
        box-sizing: border-box;
    }
}
</style>
