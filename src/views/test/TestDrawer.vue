<!-- drawer和父级元素同高 -->
<template>
  <div class="app-container">

    <div class="placeholder"></div>
    <el-container>
    <el-main class="drawer-wrapper">
      <el-button @click="drawer = true"
                 type="primary"
                 style="margin-left: 16px;">
        点我打开
      </el-button>
      <el-drawer title="我是标题"
                 :visible.sync="drawer"
                 :with-header="false"
                 :modal="true"
                 direction="rtl"
                 style="position: absolute"
                 z-index="111">
        <span>抽屉组件</span>
      </el-drawer>
      <h1>Body</h1>
    </el-main>
    </el-container>

  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl'
    }
  }
}
</script>

<style lang="scss" scoped>
.placeholder {
  width: 100%;
  height: 100px;
}
.app-container {
  height: 100%;
  // margin-right: -10px;
}
.el-container {
  height: 100%;
}
.el-drawer {
  margin-right: -20px;
}
.el-main {
  height: 100%;
  padding: 0 !important;
  overflow: hidden;
  position: relative;
}
</style>
