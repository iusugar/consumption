<!-- sidebar -->
<template>
  <div class="sidebar">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="currentRoute"
               background-color="#293E6A"
               text-color="#f1f1f1"
               class="el-menu-vertical hidden-sm-and-down"
               :collapse="isCollapse"
               :router="true">
        <!-- <el-radio-group v-model="isCollapse" @click="collapse">
        <el-radio-button :label="!isCollapse"><i :class="isFold"></i></el-radio-button>
      </el-radio-group> -->
        <el-button type="primary"
                   size="medium"
                   @click="collapse">
          <i :class="isFold"></i>
        </el-button>
        <el-menu-item index="/dashboard"
                      class="first-menu-item">
          <i class="el-icon-menu"></i>
          <span slot="title">综合数据</span>
        </el-menu-item>
        <el-menu-item index="/analysis/index">
          <i class="el-icon-data-analysis"></i>
          <span slot="title">Analysis</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-management"></i>
            <span slot="title">插座管理</span>
          </template>
          <el-menu-item index="/management/add-new">添加智能插座</el-menu-item>
          <el-menu-item index="/management/list">查看插座列表</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="/management/index">
        <i class="el-icon-s-management"></i>
        <span slot="title">Management</span>
      </el-menu-item> -->
        <el-menu-item index="/location/index">
          <i class="el-icon-location"></i>
          <span slot="title">插座分布</span>
        </el-menu-item>
        <el-menu-item index="/room/index">
          <i class="el-icon-office-building"></i>
          <span slot="title">空间管理</span>
        </el-menu-item>
        <el-menu-item index="/gateway/index">
          <i class="el-icon-box"></i>
          <span slot="title">网关配置</span>
        </el-menu-item>
        <el-menu-item index="/user/index">
          <i class="el-icon-user-solid"></i>
          <span slot="title">User</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      currentRoute: this.$route.path,
      isCollapse: false,
      isFold: 'el-icon-s-fold'
    };
  },
  methods: {

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
.sidebar {
  user-select: none;
  // width: 200px;
  background-color: #293e6a;
  .el-scrollbar {
    height: 100% !important;
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.el-menu--collapse {
  height: 100%;
}
.el-menu {
  .first-menu-item {
    margin-top: 20px;
  }
  /deep/ .is-active {
    background-color: rgba($color: #000000, $alpha: 0.2) !important;
  }
  .el-button,
  .el-radio-group {
    width: 45px;
    height: 45px;
    padding: 0;
    position: relative;
    float: right;
    z-index: 10;
    background-color: transparent;
    border-radius: 0 0 0 30px;
    background-color: rgb(255, 90, 9);
    border: none;
    i {
      margin: 0 0 5px 5px;
      font-size: 25px;
      color: rgba(255, 255, 255, 1);
    }
    /deep/ .el-radio-button__inner {
      padding: 0;
      background-color: rgba($color: #000000, $alpha: 0);
      border: none;
    }
  }
}
/deep/ .el-menu {
  li:not(.is-active) {
    color: rgb(191, 203, 217) !important;
    span {
      color: rgb(191, 203, 217);
    }
  }
}
</style>
