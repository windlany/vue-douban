import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import main from '@/components/Main';
import index from '@/components/Index';

import movie from '@/components/movie/Movie';
import movieSubject from '@/components/movie/MovieSubject';
import actorInfo from '@/components/movie/MovieActorInfo'

import baseMore from '@/components/base/BaseMore';

import book from '@/components/book/Book';
import bookMore from '@/components/book/BookMore';
import bookSubject from '@/components/book/BookSubject'

import music from '@/components/music/music';
import musicSubject from '@/components/music/MusicSubject'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
      children: [
        {path: '', name: 'main', component: index},

        // movie
        {path: 'movie', name: 'movie', component: movie},
        {path: 'movie/more', name: 'movieMore', component: baseMore},
        {path: 'movie/subject', name: 'subject', component: movieSubject},
        {path: 'movie/celebrity', name: 'actorInfo', component: actorInfo},

        // book
        {path: 'book', name: 'book', component: book},
        {path: 'book/more', name: 'bookMore', component: bookMore},
        {path: 'book/classfiy', name: 'bookClassfiy', component: baseMore},
        {path: 'book/subject', name: 'bookSubject', component: bookSubject},
      
        // music
        {path: 'music', name: 'music', component: music},
        {path: 'music/more', name: 'musicMore', component: bookMore},
        {path: 'music/subject', name: 'musicSubject', component: musicSubject},
        {path: 'music/classfiy', name: 'musicClassfiy', component: baseMore},
        
      ]
    }
  ]
})
