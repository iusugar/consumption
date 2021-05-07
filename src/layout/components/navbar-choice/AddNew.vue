<!-- 添加新插座或者新用户 -->
<template>
  <div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i class="el-icon-circle-plus-outline"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>添加插座</el-dropdown-item>
        <el-dropdown-item>添加用户</el-dropdown-item>
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
.el-dropdown {
  i {
    color: #999999;
    font-size: 20px;
    &:hover {
      color: #336699;
    }
  }
}
</style>
