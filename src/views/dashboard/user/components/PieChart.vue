<!-- 统计本月各个插座用电的占比 -->
<template>
  <div :class="className"
       :style="{width:width,height:height}"></div>
</template>

<script>
import * as echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
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
      default: '350px'
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
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          bottom: '10'
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        series: [
          {
            name: '一年用电统计',
            type: 'pie',
            radius: ['15%', '60%'],
            center: ['50%', '40%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 2
            },
            labelLine: {
              // length: 30
            },
            label: {
              formatter: ' {b|{b}:}{c} {per|{d}%}  ',
              backgroundColor: '#F6F8FC',
              borderColor: '#8C8D8E',
              borderWidth: 1,
              borderRadius: 1,
              rich: {
                a: {
                  color: '#6E7079',
                  lineHeight: 15,
                  align: 'center'
                },
                b: {
                  color: '#4C5058',
                  fontSize: 12,
                  fontWeight: 'bold',
                  lineHeight: 30
                },
                per: {
                  color: '#fff',
                  backgroundColor: '#4C5058',
                  padding: [3, 4],
                  borderRadius: 4
                }
              }
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
