import Vue from 'vue'
import Vuex from 'vuex'
import movie from './module/movie'
import book from './module/book'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
    modules: {
        movie: movie,
        book: book
    }
});