<!-- sidebar -->
<template>
  <div>
    <el-menu default-active="1"
             background-color="#003366"
             text-color="#f1f1f1"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse">
      <el-button type="primary"
                 size="medium"
                 @click="collapse">
        <i :class="isFold"></i>
      </el-button>
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">Dashboard</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-data-analysis"></i>
        <span slot="title">Analysis</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-s-management"></i>
        <span slot="title">Management</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-user-solid"></i>
        <span slot="title">User</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isCollapse: false,
      isFold: 'el-icon-s-fold'
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        this.isFold = 'el-icon-s-unfold'
      } else {
        this.isFold = 'el-icon-s-fold'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.el-menu--collapse {
  height: 100%;
}
.el-menu {
  .el-button {
    width: 30px;
    height: 30px;
    padding: 0;
    position: relative;
    float: right;
    z-index: 10;
    background-color: transparent;
    border-radius: 0 0 0 30px;
    background-color: brown;
    border: none;
    i {
      margin: 0 0 5px 5px;
      font-size: 18px;
    }
  }
}
</style>
