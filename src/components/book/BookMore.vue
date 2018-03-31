<template>
    <div class="bookMore">
        <loading :status="loading" />
        <h1 v-show="!(type=='more')">{{val.title}}</h1>
        <h1 v-show="type=='more'">{{tag}}</h1>
        <ul>
            <a-book v-for="item in val.items" :key="item.id" :item="item" @signle="toSignle"/>
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
            var tag = this.$route.query.tag;
            var type = this.$route.query.type;

            if(type == 'more') {
                this.$store.dispatch('bookTag', tag).then(()=> {
                    this.load = true;
                    if(tag == '情感') 
                        this.val = this.emotion;
                    else if(tag == '励志') 
                        this.val = this.improvement;
                    else 
                        this.val = this.books;
                });
            } else if(type == 'music') {
                this.$store.dispatch('musicTag', tag).then(()=> {
                    this.load = true;
                    if(tag == '经典') 
                        this.val = this.emotionMusic;
                    else if(tag == '粤语') 
                        this.val = this.improvementMusic;
                    else 
                        this.val = this.musics;
                });
            }
        },
        methods: {
            ...mapActions(['bookTag', 'musicTag']),
            toSignle(id) {
                if(this.type == 'more') {
                    this.$router.push({
                        name: 'bookSubject',
                        query: {
                            id
                        }
                    });
                } else if (this.type == 'music') {
                    this.$router.push({
                        name: 'musicSubject',
                        query: {
                            id
                        }
                    });
                }
            }
        },
        computed: {
            ...mapState({
                emotion: state=> state.book.emotionBooks,
                improvement: state=> state.book.improvementBooks,
                books: state=> state.book.books,
                emotionMusic: state=> state.music.emotionMusics,
                improvementMusic: state=> state.music.improvementMusics,
                musics: state=> state.music.musics,
            }),
            loading() {
                return !(this.load && this.val.items.length != 0);
            },
            type() {
                return this.$route.query.type;
            },
            tag() {
                return this.$route.query.tag;
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
