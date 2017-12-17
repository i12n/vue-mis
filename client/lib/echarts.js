import echarts from 'echarts';

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, '$echarts', {
      value: echarts
    });
  }
}