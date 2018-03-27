import vue from 'vue';
import qs from 'qs';
import ajax from 'axios';
import { stat } from 'fs';

const MOV_FIND_BY_TAG = 'MOV_FIND_BY_TAG'; // 电影标签搜索
const MOV_FIND_BY_NAME = 'MOV_FIND_BY_NAME'; // 搜索
const MOV_HOT = 'MOV_HOT';  // 近期热映榜
const MOV_TOP250 = 'MOV_TOP250';  // top250
const MOV_NEW = 'MOV_NEW';  // 新片榜

const MOV_INFO = 'MOV_INFO';  // 电影条目
const MOV_INFO_PHOTO = 'MOV_INFO_PHOTO';  // 电影剧照

export default {
    state: {   
        hot: {
            title: '',
            items: []
        },
        top250: {
            title: '',
            items: []
        },
        news: {
            title: '',
            items: []
        },
        findByTag: {   // 根据标签查找的电影组
            title: '',
            items: []
        },  
        findByName: [],  //  根据名字查找的电影
        movInfo: [], // 单个电影信息
        movPhoto: [],
    },
    mutations: {
        [MOV_FIND_BY_TAG](state, info) {
            state.findByTag.title = info.tag+'电影';
            state.findByTag.items = info.data || [];
        },
        [MOV_FIND_BY_NAME](state, info) {
            state.findByName = info || [];
        },
        [MOV_HOT](state, info) {
             state.hot.title = '影院热映';
             state.hot.items = info || [];
        },
        [MOV_TOP250](state, info) {
            state.top250.title = 'Top250';
            state.top250.items = info || [];
        },
        [MOV_NEW](state, info) {
            state.news.title = '即将上映';
            state.news.items = info || [];
        },
        [MOV_INFO](state, info) {
            state.movInfo = info || [];
        },
        [MOV_INFO_PHOTO](state, info) {
            state.movPhoto = info || [];
        },
    },
    actions: {
        // 根据传入的tag搜电影组
        movFindByTag({commit}, tag) {
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/movie/search?',
                content: qs.stringify({tag: tag}),  // query
                methods: 'GET',
            })).then((res)=> {
                commit(MOV_FIND_BY_TAG, { 
                    data: res.data.subjects, 
                    tag: tag
                });
            }).catch((error)=> {
                console.log(error);
            });
        },
        // 传入的movInfo为查询信息
        movFindByName({commit}, movInfo) {
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/movie/search?',
                content: qs.stringify({q: movInfo}),
                methods: 'GET',
            })).then((res)=> {
                commit(MOV_FIND_BY_NAME, res.data.subjects);
            }).catch((error)=> {
                console.log(error);
            });
        },
        movHot({commit}) {
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/movie/in_theaters',
                content: '',
                methods: 'GET',
            })).then((res)=> {
                console.log(res.data);
                commit(MOV_HOT, res.data.subjects); 
            }).catch((error)=> {
                console.log(error);
            });
        },
        movTop250({commit}) {
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/movie/top250',
                content: '',
                methods: 'GET',
            })).then((res)=> {
                commit(MOV_TOP250, res.data.subjects);
            }).catch((error)=> {
                console.log(error);
            });
        },
        movNew({commit}) {
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/movie/coming_soon',
                content: '',
                methods: 'GET',
            })).then((res)=> {
                commit(MOV_NEW, res.data.subjects);
            }).catch((error)=> {
                console.log(error);
            });
        },
        movInfo({commit}, movId) {  // 根据传入的电影id返回电影详细信息
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/movie/subject/'+movId,
                content: '',
                methods: 'GET',
            })).then((res)=> {
                console.log(res.data);
                commit(MOV_INFO, res.data);
            }).catch((error)=> {
                console.log(error);
            });
        },
        movPhoto({commit}, movId) {  // 需要许可，so...
            ajax.post('http://127.0.0.1:3000', qs.stringify({
                path: '/v2/movie/subject/'+movId+'/photos',
                content: '',
                methods: 'GET',
            })).then((res)=> {
                console.log(res.data);
                commit(MOV_INFO_PHOTO, res.data.photos);
            }).catch((error)=> {
                console.log(error);
            });
        }
    }
}
