<template>
  <div>
    <h1>豆瓣电影 TOP 250</h1>
    <el-table
      v-loading="loading"
      :data="movies"
      size="medium"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="title"
        label="名称"
        width="160px">
      </el-table-column>
      <el-table-column
        prop="directors"
        label="导演"
        width="180px"
        :formatter="formatDirectors">
      </el-table-column>
      <el-table-column
        prop="average"
        label="评分"
        width="140px">
        <template slot-scope="scope">
          <span class="rate-star">{{formatRates(scope.row.rating.average)}}</span>
          <span class="rate-number">{{scope.row.rating.average}}分</span>
        </template>
      </el-table-column> 
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleAdd(scope.$index, scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="start / count + 1"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="count"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
      loading: true,
      start: 0,  // 分页位置
      count: 10, // 分页大小
      total: 0,  // 总数
    }
  },

  //组件生命周期，组件已经创建，DOM 未生成
  created() {
    this.queryData({start: 0, count: 10});
  },

  // 依赖的组件
  components: {},

  // 计算属性
  computed: {},

  // 过滤属性
  filters: {},

  // 方法
  methods: {
    async queryData({start = this.start, count = this.count}) {
      this.loading = true;
      this.$axios({
        method: 'get',
        url: '/api/v2/movie/top250',
        headers: {'api-proxy-host': 'douban'},
        params: { start, count }
      })
      .then(res => {
        const { subjects, total, start, count } = res.data || {};
        this.movies = subjects;
        this.start = start;
        this.total = total;
        this.count = count;
        this.loading = false;
      })
    },
    formatDirectors(row, column, value) {
      return value.map(x => x.name).join(', ');
    },
    formatRates(average) {
      const rate = Math.round(average / 2);
      return '★★★★★☆☆☆☆☆'.slice(5 - rate, 10 - rate)
    },
    handleSizeChange(count) {
      this.queryData({count, start: 0});
    },
    handleCurrentChange(current) {
      this.queryData({start: (current - 1) * this.count});
    },
    handleAdd() {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'but do nothing 🙈🙈',
        duration: 5000
      })
    },
  }
}
</script>

<style type="text/css">
  .rate-star {
    color: #EB9E05;
    font-size: 12px;
  }
  .rate-number {
    color: #EB9E05;
    font-size: 12px;
  }
</style>