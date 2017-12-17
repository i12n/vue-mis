<template>
  <div>
    <h1>正在上映的电影-北京</h1>
    <div id="movies_chart" :style="{width: '1000px', height: '400px'}"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
    }
  },

  //组件生命周期，组件已经创建，DOM 未生
  created() {
  },

  mounted() {
    this.$axios({
      method: 'get',
      url: '/api/v2/movie/in_theaters',
      headers: {'api-proxy-host': 'douban'},
      params: {
        start: 0,
        count: 100
      }
    })
    .then(res => {
      const { subjects } = res.data || {};
      this.movies = subjects;
      this.draw();
    })
  },

  // 依赖的组件
  components: {},

  // 计算属性
  computed: {},

  // 过滤属性
  filters: {},

  // 方法
  methods: {
    formatMovie(movies) {
      var data = {};

      movies
        .map(m => m.genres)
        .forEach(m => {
          m.forEach(n => {
            n = n.trim();
            data[n] = data[n] ? data[n] + 1 : 1;
          })
        });

      let keys = [];
      let values = [];

      for (let key in data) {
        keys.push(key);
        values.push(data[key])
      }

      return {keys, values};
    },
    draw(){
      let chart = this.$echarts.init(document.getElementById('movies_chart'));
      let {keys, values} = this.formatMovie(this.movies);

      chart.setOption({
          title: { text: '' },
          tooltip: {},
          xAxis: {
            data: keys
          },
          yAxis: {},
          series: [{
              name: '数量',
              type: 'bar',
              data: values
          }]
      });
    }


  }
}
</script>

<style type="text/css">
</style>