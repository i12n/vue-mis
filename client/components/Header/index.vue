<template>
  <div class="page-header">
      <el-row>
        <el-col :span="20">
          <div class="nav-logo">vue mis</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content"></div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
}
</script>
<style scoped>
  .page-header {
    width: 100%;
    height: 43px;
    padding: 0 10px;
    background: #205081;
    border-bottom: 1px solid #2e3d54;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
  }
  .el-row {
    /*height: 43px;*/
  }

  .el-header {
    height: auto;
    width: 100%;
  }
  .nav-logo {
    padding: 0 8px;
    font-size: 18px;
    line-height: 42px;
    font-weight: bold;
  }
</style>