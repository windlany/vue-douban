<template>
    <div id="app">
        <header id="top-bar" v-show="!show">
            <router-link to='/' class="index"></router-link>
              <div>
                  <router-link to='/movie' class='item'>电影</router-link>
                  <router-link to='/' class='item'>图书</router-link>
                  <router-link to='/' class='item'>广播</router-link>
                  <router-link to='/' class='item'>小组</router-link>
                  <span class='item' @click='disSearch'></span>
              </div>
        </header>
        <main-search v-show="show" @hide='hide'/>
        <router-view class="view" v-show="!show" />
    </div>
</template>

<script>
import MainSearch from './MainSearch';

export default {
    data() {
        return {
          show: false
        }
    }, 
    methods: {
        disSearch() {
          this.show = true;
        },
        hide() {
          this.show = false;
        }
    },
    components: {
        MainSearch
    }
}
</script>

<style lang='less'>
#app {
    padding-top: 47px;
    #top-bar {
        width: 100%;
        max-width: 540px;
        margin: 0 auto;
        height: 47px; 
        padding: 12px 18px; 
        background-color: #fff;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f3f3f3;
        position: fixed;
        top: 0;
        z-index: 2;
        .index {
            width: 46px;
            height: 22px;
            background: url(/static/img/index.png) no-repeat;
            background-size: contain; 
        }
        .item {
            font-size: 15px;
            margin-left: 15px;
            text-decoration: none;
            vertical-align: middle;
        } 
    }
    .item:nth-child(1) {
        color: #2384e8;
    }
    .item:nth-child(2) {
        color: #9f7860;
    }
    .item:nth-child(3) {
        color: #E4A813;
    }
    .item:nth-child(4) {
        color: #2AB8CC;
    }
    .item:nth-child(5) {
        width: 2.1rem;
        height: 2rem;
        background: url(/static/img/search.png) 0 4px no-repeat;
        background-size: contain;
        display: inline-block;
    }   
    .view {
        overflow: hidden;
    }
}
</style>
