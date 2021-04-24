<!-- 统计本月各个插座用电的占比 -->
<template>
  <div :class="className"
       :style="{width:width,height:height}"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '一年用电统计',
            type: 'pie',
            radius: [30, 70],
            center: ['50%', '45%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              { value: 601, name: 'Jan' },
              { value: 538, name: 'Feb' },
              { value: 332, name: 'Mar' },
              { value: 430, name: 'Apr' },
              { value: 728, name: 'May' },
              { value: 926, name: 'Jun' },
              { value: 1022, name: 'Jul' },
              { value: 818, name: 'Aug' },
              { value: 618, name: 'Sep' },
              { value: 577, name: 'Oct' },
              { value: 582, name: 'Nov' },
              { value: 509, name: 'Dec' }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
</style>
