<template>
    <div class="search">
        <loading :status="loading" />
        <div class="searchIn">
            <input type="text" v-model="search">
            <a href="##" @click="dispatch">搜索</a>
        </div>

        <base-search :items="{items: music, title: '音乐'}"/>
        <base-search :items="{items: movie, title: '影视'}"/>
        <base-search :items="{items: book, title: '读书'}"/>

    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import BaseSearch from './base/BaseSearch.vue'
    import Loading from './base/BaseLoading.vue'

    export default {
        beforeCreate() {
            window.scrollTo(0, 0);
            var search = this.$route.query.search;
            this.$store.dispatch('musicQuery', search).then(()=> {
                this.musicLoad = true;
            });
            this.$store.dispatch('movFindByName', search).then(()=> {
                this.movieLoad = true;
            });
            this.$store.dispatch('bookQuery', search).then(()=> {
                this.bookLoad = true;
            });
        },
        data() {
            return {
                star: ['','','','',''],
                search: this.$route.query.search,
                musicLoad: false,
                movieLoad: false,
                bookLoad: false
            }
        },
        methods: {
            ...mapActions(['musicQuery', 'movFindByName', 'bookQuery']),
            dispatch() {
                if(!this.search.trim()) return;

                var search = this.search.trim();
                this.musicLoad = this.movieLoad = this.bookLoad = false;
                this.$store.dispatch('musicQuery', search).then(()=> {
                    this.musicLoad = true;
                });
                this.$store.dispatch('movFindByName', search).then(()=> {
                    this.movieLoad = true;
                });
                this.$store.dispatch('bookQuery', search).then(()=> {
                    this.bookLoad = true;
                });
            }
        },
        computed: {
            ...mapState({
                movie: state=> state.movie.findByName,
                music: state=> state.music.musics,
                book: state=> state.book.books
            }), 
            loading() {
                return !(this.musicLoad&&this.movieLoad&&this.bookLoad);
            }
        },
        components: {
            BaseSearch,
            Loading
        }
    }
</script>

<style lang="less">
.search {
    background-color: #fff;
    padding-bottom: 60px;
    .searchIn {
        height: 45px;
        padding: 7px 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #F2F2F2;
        display: flex;
        input {
            width: 85%;
            height: 30px;
            box-sizing: border-box;
            border: none;
            background-color: #f5f5f5;
            border-radius: 3px;
            padding: 5px 8px;
            font-size: 14px;
            color: #111;
        }
        input:focus {
            outline: none;
        }
        a {
            color: #333;
            font-size: 14px;
            line-height: 30px;
            padding-left: 5%;
            height: 30px;
            width: 10%;
        }
    }
}
</style>
