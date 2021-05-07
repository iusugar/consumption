<!-- 用户界面 -->
<template>
  <div>
    <el-row>
      <panel-group />
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24"
              :sm="24"
              :lg="12">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24"
              :sm="24"
              :lg="12">
        <div class="chart-wrapper">
          <line-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './components/LineChart.vue'
import PanelGroup from './components/PanelGroup.vue'
import PieChart from './components/pieChart'
// import ScatterChart from './components/ScatterChart.vue'

export default {
  components: { PanelGroup, PieChart, LineChart },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
  border-radius: 5px;
  box-shadow: 1px 1px 15px #ddd;
}
</style>
