# v-douban

> vue全家桶实现基于豆瓣api高仿豆瓣app手机版，由于部分API不开放所以包含四个版块：电影、图书、音乐、小组。 
## 效果图 
![](https://github.com/windlany/vue-douban/blob/master/static/preview/loading.png)
![](https://github.com/windlany/vue-douban/blob/master/static/preview/search.png)
![](https://github.com/windlany/vue-douban/blob/master/static/preview/movie.png)
![](https://github.com/windlany/vue-douban/blob/master/static/preview/movieMore.png)
![](https://github.com/windlany/vue-douban/blob/master/static/preview/movieSignle.png)
![](https://github.com/windlany/vue-douban/blob/master/static/preview/book.png)
![](https://github.com/windlany/vue-douban/blob/master/static/preview/bookMore.png)
![](https://github.com/windlany/vue-douban/blob/master/static/preview/bookSignle.png)
![](https://github.com/windlany/vue-douban/blob/master/static/preview/music.png)
![](https://github.com/windlany/vue-douban/blob/master/static/preview/musicMore.png)
![](https://github.com/windlany/vue-douban/blob/master/static/preview/musicSignle.png)
## 技术栈
- vue
- vue-router
- vuex
- axios
## 主要目录结构 
- src
    - components
        - base   --------------  公用组件
        - book   --------------  图书版块
        - movie   --------------  电影版块
        - music   --------------  音乐版块
    - router
        - index.js   --------------  路由
    - vuex
        - module
            - book.js   --------------  图书状态管理
            - movie.js   --------------  电影状态管理
            - music.js   --------------  音乐状态管理
        -vuex.js
    - App.vue
    - main.js
- static   --------------  静态资源
- server.js   --------------  node代理，解决跨域 
## 已完成
- 电影版块
- 图书版块
- 音乐版块
## 有待完成
- 小组版块
- 主页文章
- 正在进行中，敬请期待...
