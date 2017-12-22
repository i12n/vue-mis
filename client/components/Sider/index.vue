<template>
  <div class="page-side">
    <div class="menu">
      <el-menu
        :collapse="isCollapse"
        :unique-opened="true"
        default-active="/home"
        router
        class="el-menu-vertical"
        background-color="#f5f5f5"
        text-color="#666666"
        active-text-color="#409EFF"
        @open="handleOpen"
        @close="handleClose"
        @click="haneleCollapse">

        <el-menu-item
          key="/home"
          index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
        </el-menu-item>
      
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>豆瓣</span>
          </template>
          <el-menu-item
            key="/douban/top250"
            index="/douban/top250">
            <i class="el-icon-tickets"></i>
            <span slot="title">TOP250</span>
          </el-menu-item>
          <el-menu-item
            key="/douban/in_theaters"
            index="/douban/in_theaters">
              <i class="el-icon-news"></i>
              <span slot="title">正在上映</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="collapse-btn">
      <el-button
        v-if="isCollapse"
        plain
        size="small"
        icon="el-icon-d-arrow-right"
        type="text"
        @click="haneleCollapse">
      </el-button>
      <el-button
        v-else="isCollapse"
        plain
        size="small"
        icon="el-icon-d-arrow-left"
        type="text"
        @click="haneleCollapse">
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    haneleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style scoped>
  .page-side {
    position: relative;
    height: 100%;
    box-sizing: border-box;
  }
  .menu {
    height: 100%;
  }
  .el-menu {
    height: 100%;
    padding-bottom: 32px; 
    box-sizing: border-box;
    overflow: visible;
  }

  .el-menu:not(.el-menu--collapse) {
    overflow: auto;
    width: 216px;
  }
  .collapse-btn {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

  .collapse-btn .el-button {
    display: block;
    width: 100%;
    font-size: 16px;
    color: #878d99 !important;
    font-weight: bold !important;
    border-top: 1px solid #e6e6e6;
    border-radius: none;
    background: #f5f5f5;
    border-right: 1px solid #e6e6e6;
  }
</style>