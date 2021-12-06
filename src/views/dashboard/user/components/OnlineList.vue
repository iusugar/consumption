<!-- 插座通电时的通知列表 -->
<template>
  <div class="timeline-container">
    <el-timeline>
      <el-timeline-item v-for="(activity, index) in activities"
                        :key="index"
                        :icon="activity.icon"
                        :type="activity.type"
                        :color="activity.color"
                        :size="activity.size"
                        :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activities: [{
        content: '插座A1-502上线',
        timestamp: '2021-10-09 10:46',
        size: 'large',
        color: '#0bbd87'
      }, {
        content: '插座A2-302下线',
        timestamp: '2021-10-08 20:46'
      }]
    };
  }
}
</script>

<style lang="scss" scoped>
.timeline-container {
  height: 350px;
  box-sizing: border-box;
  padding: 20px 10px;
}
.el-timeline {
  text-align: left;
}
</style>
