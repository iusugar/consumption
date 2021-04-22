<!-- 消息提醒组件 -->
<template>
  <div>
    <el-dropdown trigger="click">
      <el-badge is-dot
                class="message">
        <i class="el-icon-bell"></i>
      </el-badge>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">socket12:电压过高</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus">socket3:电流过大</el-dropdown-item>
        <el-dropdown-item icon="el-icon-check">socket6:</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.el-badge {
  /deep/ .is-dot {
    right: 10px !important;
    top: 5px !important;
  }
  .el-icon-bell {
    color: #999999;
    font-size: 25px;
    &:hover {
      color: #336699;
    }
  }
}
</style>
