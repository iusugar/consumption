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
        <div class="chart-wrapper pie-chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24"
              :sm="24"
              :lg="12">
        <div class="chart-wrapper line-chart-wrapper">
          <line-chart />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24"
              :sm="24"
              :lg="24">
        <div class="chart-wrapper heat-map-wrapper">
          <heat-map />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24"
              :sm="16"
              :lg="12">
        <div class="list-wrapper not-used-list">
          <not-used-list />
        </div>
      </el-col>
      <el-col :xs="24"
              :sm="8"
              :lg="12">
        <div class="list-wrapper online-list">
          <online-list />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './components/LineChart.vue'
import PanelGroup from './components/PanelGroup.vue'
import PieChart from './components/pieChart'
import HeatMap from './components/HeatMap.vue'
import OnlineList from './components/OnlineList.vue'
import NotUsedList from './components/NotUsedList.vue'
// import ScatterChart from './components/ScatterChart.vue'

export default {
  components: { PanelGroup, PieChart, LineChart, HeatMap, OnlineList, NotUsedList },
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
  border-radius: 10px;
  box-shadow: 1px 1px 15px #ddd;
}
.pie-chart-wrapper {
  min-width: 450px;
}
.line-chart-wrapper {
  min-width: 450px;
}
.heat-map-wrapper {
  min-width: 450px;
}
.list-wrapper {
  background: #fff;
  margin-bottom: 32px;
  box-shadow: 1px 1px 15px #ddd;
}
.online-list {
  padding: 10px 10px 0 10px;
}
</style>
