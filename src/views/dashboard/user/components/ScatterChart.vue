<!-- 昨日用电时间点散点图 -->
<template>
  <div :class="className"
       :style="{height:height,width:width}"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    height: {
      type: String,
      default: '350px'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      chart: null,
      data: [['18', '1212'], ['49', '0203']]
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
        title: {
          text: '昨日用电时间点统计',
          left: 'center',
          top: 0
        },
        visualMap: {
          min: 0,
          max: 2459,
          dimension: 1,
          orient: 'vertical',
          right: 10,
          top: 'center',
          text: ['HIGH', 'LOW'],
          calculable: true,
          inRange: {
            color: ['#f2c31a', '#24b7f2']
          }
        },
        // tooltip: {
        //   trigger: 'item',
        //   axisPointer: {
        //     type: 'cross'
        //   }
        // },
        xAxis: [{
          type: 'value',
          min: 0,
          max: 60
        }],
        yAxis: [{
          type: 'value',
          data: ['0000', '0100'],
          min: 0,
          max: 2459,
          axisLabel: {
            formatter: function(value) {
              return value
            }
          }
        }],
        series: [{
          name: 'price-area',
          type: 'scatter',
          symbolSize: 5,
          // itemStyle: {
          //     normal: {
          //         borderWidth: 0.2,
          //         borderColor: '#fff'
          //     }
          // },
          data: this.data
        }]
      })
    }
  }
}
</script>

<style scoped>
</style>
