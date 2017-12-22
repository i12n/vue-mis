<template>
  <div id="app">
    <el-container>
      <el-header>
        <xy-header></xy-header>
      </el-header>
      <el-container class="content-container">
        <el-aside width="auto">
          <xy-sider></xy-sider>
        </el-aside>
        <el-main>
          <transition
            name="fade"
            mode="out-in"
          >
            <router-view class="view"></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import xyHeader from './components/Header';
import xySider from './components/Sider';
export default {
  name: 'app',
  components: { xyHeader, xySider }
}
</script>

<style scoped>
.el-header {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 43px !important;
  box-sizing: border-box;
}
.el-aside {
  position: relative;
  width: auto;
  height: 100%;
  overflow: visible;
  background: #f0f3f5;
}
.el-container {
  position: relative;
  height: 100%;
}
.el-main {
  padding: 8px;
}

.content-container {
  margin-top: -43px;
  padding-top: 43px;
  box-sizing: border-box;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>