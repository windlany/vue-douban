import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import main from '@/components/Main';
import index from '@/components/Index';
import movie from '@/components/movie/Movie';
import movieMore from '@/components/movie/MovieMore';
import movieSubject from '@/components/movie/MovieSubject';
import actorInfo from '@/components/movie/MovieActorInfo'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
      children: [
        {path: '', name: 'main', component: index},
        {path: 'movie', name: 'movie', component: movie},
        {path: 'movie/more', name: 'movieMore', component: movieMore},
        {path: 'movie/subject', name: 'subject', component: movieSubject},
        {path: 'movie/celebrity', name: 'actorInfo', component: actorInfo},
      ]
    }
  ]
})
