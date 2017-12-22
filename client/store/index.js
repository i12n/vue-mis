import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';
import state from './state'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,        // 默认初始状态
  getters,      // 获取应用状态
  actions,      // 触发更改状态
  mutations     // 更新应用状态
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store