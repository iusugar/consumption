<!-- 插座通电时的通知列表 -->
<template>
  <div class="block">
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
      }, {
        content: '插座A2-102下线',
        timestamp: '2021-10-03 10:40'
      }, {
        content: '插座A3-303上线',
        timestamp: '2021-10-02 20:46',
        size: 'large',
        color: '#0bbd87'
      }, {
        content: '插座A1-222上线',
        timestamp: '2021-10-02 10:02',
        size: 'large',
        color: '#0bbd87'
      }]
    };
  }
}
</script>

<style lang="scss" scoped>
.el-timeline {
  text-align: left;
}
</style>
