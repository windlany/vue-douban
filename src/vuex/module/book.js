import vue from 'vue';
import qs from 'qs';
import ajax from 'axios';

const BOOK_EMOTION = 'BOOK_EMOTION';
const BOOK_IMPROVEMENT = 'BOOK_IMPROVEMENT';
const BOOK_TAG = 'BOOK_TAG'; // 根据标签搜索图书数组
const BOOK_QUERY = 'BOOK_QUERY'; // 根据关键字搜索图书数组
const BOOK_ID = 'BOOK_ID'; // 根据id搜图书具体信息

export default {
    state: {
        emotionBooks: {items: []},
        improvementBooks: {items: []},
        books: {items: []},
        bookInfo: {}
    },
    mutations: {
        [BOOK_EMOTION](state, info) {
            state.emotionBooks.title = info.title;
            state.emotionBooks.items = info.items || [];
            state.emotionBooks.tag = info.tag;
        },
        [BOOK_IMPROVEMENT](state, info) {
            state.improvementBooks.title = info.title;
            state.improvementBooks.items = info.items || [];
            state.improvementBooks.tag = info.tag;
        },
        [BOOK_TAG](state, info) {
            state.books.title = info.title;
            state.books.items = info.items || [];
            state.books.tag = info.tag;
        },
        [BOOK_QUERY](state, info) { ;
            state.books = info || []; 
        },
        [BOOK_ID](state, info) {
            state.bookInfo = info || {};
        }
    },
    actions: {
        bookTag({commit}, tag) {  // 根据标签查找book
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/book/search?',
                content: qs.stringify({tag: tag}),
                methods: 'GET',
            })).then(res=> {
                var obj = {
                    title: '最受关注的图书 | ' + tag + '类',
                    items: res.data.books,
                    tag: tag
                };
                if(tag == '情感') {
                    commit(BOOK_EMOTION, obj);  // 情感类book
                } else if (tag == '励志') {
                    commit(BOOK_IMPROVEMENT, obj);  // 情感类book
                } else {
                    commit(BOOK_TAG, obj); 
                }
            }).catch(error=> {
                console.log(error);
            });
        },
        bookQuery({commit}, query) {  // 根据关键字查找book
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/book/search?',
                content: qs.stringify({q: query}),
                methods: 'GET',
            })).then(res=> {  
                commit(BOOK_QUERY, res.data.books);  
            }).catch(error=> {
                console.log(error);
            });
        },
        bookId({commit}, id) {
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/book/'+id,
                content: '',
                methods: 'GET',
            })).then(res=> { 
                console.log(res.data);
                commit(BOOK_ID, res.data);  
            }).catch(error=> {
                console.log(error);
            });
        }
    }
}
