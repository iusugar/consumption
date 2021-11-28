<!-- 页面中部显示房间平面模型、用电记录和图表 -->
<template>
  <div class="central-panel-container">
    <el-row :gutter="20">
      <el-col :xs="24"
              :sm="24"
              :md="24"
              :lg="12">
        <div class="plane-model">
          {{location}}
        </div>
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
import bus from '@/utils/bus.js'

export default {
  components: { LineChart },
  data() {
    return {
      deviceData: [],
      locationList: [],
      location: '占位符',
      devId: ''
    }
  },
  mounted() {
    this.getPosition()
  },
  methods: {
    getPosition() {
      bus.$on('deviceDataList', e => {
        this.deviceData = e
        this.locationList.splice(0, this.locationList.length)
        this.location = ''
        for (let data of e) {
          this.locationList.push({ devId: data.id, location: data.location })
        }
      })
      bus.$on('checkedDevice', e => {
        // console.log(e);
        if (this.locationList != null && this.locationList.length > 0) {
          this.location = this.locationList[e].location;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.central-panel-container {
  .el-row:nth-child(1) {
    padding: 40px 50px 50px 80px;
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
      box-shadow: 0 2px 5px #00000025;
    }
  }
}
</style>
