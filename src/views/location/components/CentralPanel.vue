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
        <div class="Usage-history">
          <el-scrollbar wrap-class="scrollbar" style="height: 100%;width: 100%;">
            <el-timeline>
              <el-timeline-item v-for="(activity, index) in activities"
                                :key="index"
                                :timestamp="activity.timestamp"
                                :color="activity.color">
                {{activity.status}}
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </div>
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
import { fetchHistoricalActivities } from '@/api/historical.js'
import LineChart from './chart/LineChart.vue'
import bus from '@/utils/bus.js'

export default {
  components: { LineChart },
  data() {
    return {
      deviceData: [],
      locationList: [],
      location: '稍等',
      devId: '',
      // 设备上下线时间线
      activities: [{
        status: '活动按期开始',
        timestamp: '2018-04-15'
      }]
    }
  },
  activated() {
    this.getPosition()
    this.getActivityData()
  },
  methods: {
    getPosition() {
      // 接收设备列表
      bus.$on('deviceDataList', e => {
        this.deviceData = e
        this.locationList.splice(0, this.locationList.length)
        this.location = ''
        for (let data of e) {
          this.locationList.push({ devId: data.id, location: data.location, roomNum: data.roomNum })
        }
      })
      bus.$on('checkedDevice', e => {
        if (this.locationList != null && this.locationList.length > 0) {
          this.location = this.locationList[e].roomNum + '-' + this.locationList[e].location;
        }
      })
    },
    getActivityData() {
      bus.$on('checkedDeviceId', e => {
        fetchHistoricalActivities(e).then(response => {
          var activities = []
          for (let data of response.data) {
            activities.push({ 'status': data.status ? '在线' : '离线', 'color': data.status ? '#2baa5d' : '#e55d5d', 'timestamp': new Date(Date.parse(data.createTime)).toLocaleString('chinese', { hour12: false }).replace(/\//g, '-') })
          }
          this.activities = activities
        })
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
      padding: 30px 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
      background-color: #ffffffaa;
      box-shadow: 0 2px 5px #00000015;
    }
    .Usage-history {
      width: 100%;
      height: 300px;
      margin-bottom: 20px;
      box-sizing: border-box;
      background-color: #ffffffaa;
      box-shadow: 0 2px 5px #00000015;
      padding: 20px 30px;
      /deep/ .scrollbar {
        overflow-x: hidden;
      }
      .el-timeline {
        text-align: left;
      }
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
