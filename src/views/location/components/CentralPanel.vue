<!-- 页面中部显示房间平面模型、用电记录和图表 -->
<template>
  <div class="central-panel-container">
    <el-row :gutter="20">
      <el-col :xs="24"
              :sm="24"
              :md="24"
              :lg="12">
        <div class="plane-model"></div>
      </el-col>
      <el-col :xs="24"
              :sm="24"
              :md="24"
              :lg="12">
        <div class="Usage-record"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="chart-wrapper">
          <line-chart width="100%"
                      height="100%" />
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './chart/LineChart.vue'
export default {
  components: { LineChart },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.central-panel-container {
  .el-row:nth-child(1) {
    padding: 80px 50px 50px 80px;
    width: 100%;
    height: 100%;
    .plane-model {
      width: 100%;
      height: 300px;
      margin-bottom: 20px;
      background-color: #ffffffaa;
      box-shadow: 0 2px 5px #00000015;
    }
    .Usage-record {
      width: 100%;
      height: 300px;
      margin-bottom: 20px;
      background-color: #5c5c5caa;
      box-shadow: 0 2px 5px #00000015;
    }
  }
  .el-row:nth-child(2) {
    .chart-wrapper {
      // position: relative;
      width: 100%;
      height: 300px;
      margin-bottom: 50px;
    }
  }
}
</style>
