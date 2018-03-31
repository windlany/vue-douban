<template>
    <div id="more">
        <loading :status="loading" />
        <h1 v-show="!(type == 'bookClass')">{{val.title}}</h1>
        <h1 v-show="type == 'bookClass'">{{val.tag}}</h1>
        <ul>
            <a-mov v-for="item in val.items" :key="item.id" :item="item" @signle="toSignle"/>
        </ul>
    </div>
</template>

<script>
    import AMov from '../base/BaseSingle.vue';
    import Loading from '../base/BaseLoading.vue'
    import qs from 'qs';
    import {mapActions, mapState} from 'vuex';

    export default {
        data() {
            return {
                load: false, 
                val: {
                    title: '',
                    items: []
                }
            };
        },  
        beforeCreate() {
            window.scrollTo(0, 0);
            var type = this.$route.query.type;
            var name = this.$route.query.tag;

            if(type == 'more') {
                this.$store.dispatch(name).then(()=> {
                    this.load = true;
                    switch(name) {
                        case 'movHot':
                            this.val = this.hot;
                            break;
                        case 'movTop250':
                            this.val = this.top250;
                            break;
                        case 'movNew':
                            this.val = this.news;
                            break; 
                    }
                });
            } else if(type == 'classic') {
                this.$store.dispatch('movFindByTag', name).then(()=> {
                    this.load = true;
                    this.val = this.findByTag;
                });
            } else if(type == 'bookClass') {
                this.$store.dispatch('bookTag', name).then(()=> {
                    this.load = true;
                    this.val = this.books;  
                });
            } else if(type == 'musicClass') {
                this.$store.dispatch('musicTag', name).then(()=> {
                    this.load = true;
                    this.val = this.musics;  
                });
            }
           
        }, 
        methods: { 
            ...mapActions([
                'movFindByTag',
                'movHot',
                'movTop250',
                'movNew',
                'bookTag',
                'musicTag'
            ]),
            toSignle(id) {
                var name;
                if(this.type == 'musicClass') name = 'musicSubject';
                else 
                    name = this.type=='bookClass' ? 'bookSubject': 'subject';
                this.$router.push({
                    name, 
                    query: {
                        id
                    }
                });
            },
            // 瀑布流
            disImg() {
                
            },  
        },
        computed: {  
            ...mapState({
                hot: state => state.movie.hot,
                top250: state => state.movie.top250,
                news: state => state.movie.news,
                findByTag: state=> state.movie.findByTag,
                books: state=> state.book.books,
                musics: state=> state.music.musics
            }),
            loading() {
                return !(this.load && this.val.items.length != 0);
            },
            type() {
                return this.$route.query.type;
            }
        },
        components: {
            AMov,
            Loading,
        }
    }
</script>

<style lang="less">
#more {
    background-color: #fff;
    h1 {
        font-size: 24px;
        font-weight: 500;
        margin: 17px 0 6px 0;
        padding-left: 18px;
        box-sizing: border-box;
    }
    ul {
        padding: 20px 0;
        display: flex;
        flex-wrap: wrap;
        padding-left: 4px;
        li {
            width: 32.2%;
            padding: 0 14px;
            margin: 0;
            .img {
                height: 131px; 
            }
        }
    }
}
</style>
