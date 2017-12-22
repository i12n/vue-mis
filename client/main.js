import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.css';
import store from './store';
import routes from './router';
import App from './App.vue';
import VueAxios from './lib/axios';
import VueMoment from './lib/moment';
import VueEcharts from './lib/echarts';


Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueMoment)
Vue.use(VueAxios)
Vue.use(VueEcharts)


const router = new VueRouter({
  routes,
  mode: 'history',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
        return { x: 0, y: to.meta.savedPosition ||0}
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
