<!-- 消息提醒组件 -->
<template>
  <div>
    <el-dropdown trigger="click">
      <el-badge is-dot
                class="message">
        <i class="el-icon-bell"></i>
      </el-badge>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :style="itemStyle"
                          v-for="item in socketData"
                          :key="item.num"><span :class=[item.level]><i class="el-icon-warning"></i></span>插座 {{item.num}} : {{item.state}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>
export default {
  data() {
    return {
      itemStyle: 'border-bottom:1px solid rgba(0,0,0,0.1);font-size:12px',
      socketData: [{ 'num': 'A2F2216', 'state': '电压超标10% 过高警告', 'level': 'warning' }, { 'num': 'A1F4402', 'state': '电流过大', 'level': 'danger' }]
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
    font-size: 20px;
    &:hover {
      color: #336699;
    }
  }
}
.el-dropdown-menu {
  span.warning {
    color: rgba($color: #ff7700, $alpha: 1);
  }
  span.danger {
    color: rgba($color: #ff0000, $alpha: 1);
  }
}
</style>
