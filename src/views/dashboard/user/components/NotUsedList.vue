<!-- 长时间没用插座的通知列表 -->
<template>
  <div>
    <el-table :data="tableData"
              style="width: 100%"
              :stripe="true"
              :row-class-name="tableRowClassName"
              :header-cell-style="{textAlign: 'center'}"
              :cell-style="{ textAlign: 'center' }">
      <el-table-column prop="date"
                       label="上一次使用日期"
                       width="180">
      </el-table-column>
      <el-table-column prop="number"
                       label="编号"
                       width="180">
      </el-table-column>
      <el-table-column prop="location"
                       label="位置"
                       :show-overflow-tooltip="true">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2018-05-02 10:20:05',
        number: 'A2F5510',
        location: 'A2教学楼5楼510'
      }, {
        date: '2018-05-04 09:08:22',
        number: 'A2F5502',
        location: 'A2教学楼5楼502'
      }, {
        date: '2019-05-01 14:23:25',
        number: 'A1F2223',
        location: 'A1教学楼2楼223'
      }, {
        date: '2019-10-01 14:23:25',
        number: 'A1F2223',
        location: 'A1教学楼2楼223'
      }]
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return 'warning-row';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table .warning-row {
  // background: rgba($color: #336699, $alpha: 0.1);
}
</style>
