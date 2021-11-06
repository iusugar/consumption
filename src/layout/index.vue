<!-- 主要布局 -->
<template>
  <div class="app-wrapper">
    <el-container>
      <sidebar />
      <el-container>
        <el-header>
          <navbar />
        </el-header>
        <el-main>
          <app-main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

export default {
  name: 'Layout',
  components: { Sidebar, Navbar, AppMain },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .el-container {
    height: 100%;
    // background-color: #ff000000;
    .el-header {
      background-color: #fdfdfd;
      height: 45px !important;
      padding: 0;
      // margin-bottom: 10px;
      z-index: 10;
      box-shadow: 1px 1px 5px #00000015;
    }

    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
      padding: 0;
    }
  }
}
</style>
