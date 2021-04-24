<!-- 用户界面 -->
<template>
  <div>
    <el-row>
      <panel-group/>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup.vue'
import PieChart from './components/pieChart'

export default {
  components: { PanelGroup, PieChart },
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
  }
</style>
