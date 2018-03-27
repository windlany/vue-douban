import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';
import main from '@/components/Main';
import index from '@/components/Index';
import movie from '@/components/Movie';
import movieMore from '@/components/MovieMore';
import movieSubject from '@/components/MovieSubject';

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
      ]
    }
  ]
})
