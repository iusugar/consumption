<!-- 插座通电时的通知列表 -->
<template>
  <div class="timeline-container">
    <el-scrollbar wrap-class="scrollbar"
                  style="height: 100%;width: 100%;">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in activities"
                          :key="index"
                          :color="activity.color"
                          :size="activity.size"
                          :timestamp="activity.timestamp">
          {{activity.deviceId}} {{activity.status}}
        </el-timeline-item>
      </el-timeline>
    </el-scrollbar>
  </div>
</template>

<script>
import { fetchRecentlyActivities } from '@/api/historical.js'

export default {
  data() {
    return {
      activities: [{
        status: '插座A1-502上线',
        timestamp: '2021-10-09 10:46',
        size: 'large',
        color: '#0bbd87'
      }, {
        status: '插座A2-302下线',
        timestamp: '2021-10-08 20:46'
      }]
    };
  },
  activated() {
    this.getRecentlyActivities()
  },
  methods: {
    getRecentlyActivities() {
      fetchRecentlyActivities().then(response => {
        var activities = []
        for (let data of response.data) {
          activities.push({
            'deviceId': data.deviceId,
            'status': data.status ? '在线' : '离线',
            'timestamp': new Date(Date.parse(data.createTime)).toLocaleString('chinese', { hour12: false }).replace(/\//g, '-'),
            'color': data.status ? '#2baa5d' : '#e55d5d',
            'size': data.status ? 'large' : 'normal'
          })
        }
        this.activities = activities
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.timeline-container {
  height: 350px;
  box-sizing: border-box;
  padding: 20px 10px;
  /deep/ .scrollbar {
    overflow-x: hidden;
  }
}
.el-timeline {
  text-align: left;
}
</style>
