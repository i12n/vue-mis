import DoubanTop250 from '../page/douban/top250.vue';
import DoubanInTheaters from '../page/douban/intheaters.vue';
import Home from '../page/home/index.vue';


let routes = [
  {
    path: '/douban/top250',
    component: DoubanTop250,
  },
  {
    path: '/douban/in_theaters',
    component: DoubanInTheaters,
  },
  {
    path: '/',
    component: Home,
  },
  {
    path: '/home',
    redirect: '/',
  },
  {
    path: '*',
    redirect: '/',
  },
];

export default routes;