import vue from 'vue';
import qs from 'qs';
import ajax from 'axios';

const MUSIC_EMOTION = 'MUSIC_EMOTION';
const MUSIC_IMPROVEMENT = 'MUSIC_IMPROVEMENT';
const MUSIC_TAG = 'MUSIC_TAG'; // 根据标签搜索图书数组
const MUSIC_QUERY = 'MUSIC_QUERY';
const MUSIC_ID = 'MUSIC_ID'; // 根据id搜图书具体信息

export default {
    state: {
        emotionMusics: {items: []},
        improvementMusics: {items: []},
        musics: {items: []},
        musicInfo: {}
    },
    mutations: {
        [MUSIC_EMOTION](state, info) {
            state.emotionMusics.title = info.title;
            state.emotionMusics.items = info.items || [];
            state.emotionMusics.tag = info.tag;
        },
        [MUSIC_IMPROVEMENT](state, info) {
            state.improvementMusics.title = info.title;
            state.improvementMusics.items = info.items || [];
            state.improvementMusics.tag = info.tag;
        },
        [MUSIC_TAG](state, info) {
            state.musics.title = info.title;
            state.musics.items = info.items || [];
            state.musics.tag = info.tag;
        },
        [MUSIC_QUERY](state, info) {
            state.musics = info || [];
        },
        [MUSIC_ID](state, info) {
            state.musicInfo = info || {};
        }
    },
    actions: {
        musicTag({commit}, tag) {  // 根据标签查找music
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/music/search?',
                content: qs.stringify({tag: tag}),
                methods: 'GET',
            })).then(res=> {
                var obj = {
                    title: tag + '新碟榜',
                    items: res.data.musics,
                    tag: tag
                };
                if(tag == '经典') {
                    commit(MUSIC_EMOTION, obj);  // 情感类MUSIC
                } else if (tag == '粤语') {
                    commit(MUSIC_IMPROVEMENT, obj);  // 情感类MUSIC
                } else {
                    commit(MUSIC_TAG, obj); 
                }
            }).catch(error=> {
                console.log(error);
            });
        },
        musicQuery({commit}, query) {  // 根据标签查找music
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/music/search?',
                content: qs.stringify({q: query}),
                methods: 'GET',
            })).then(res=> {  
                commit(MUSIC_QUERY, res.data.musics); 
            }).catch(error=> {
                console.log(error);
            });
        },
        musicId({commit}, id) {
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/music/'+id,
                content: '',
                methods: 'GET',
            })).then(res=> { 
                commit(MUSIC_ID, res.data);  
            }).catch(error=> {
                console.log(error);
            });
        }
    }
}
