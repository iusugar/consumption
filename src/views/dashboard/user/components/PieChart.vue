<!-- 统计年度各个插座用电的占比 -->
<template>
  <div :class="className"
       :style="{width:width,height:height}"></div>
</template>

<script>
import { fetchYearConsumption } from '@/api/electricity.js'
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
      chart: null,
      consumption: [6661, 7258, 8876, 4563, 4245, 8742, 5921, 4791, 12331, 8823, 7836, 8822]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
    this.getYearConsumption()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getYearConsumption() {
      fetchYearConsumption().then(response => {
        this.consumption = response.data
        // this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        // title: {
        //   text: '一年用电占比',
        //   textStyle: {
        //     color: '#3B5998',
        //     fontSize: 14
        //   }
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} kWh ({d}%)'
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
            name: '用电统计',
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
              formatter: ' {b|{b}:}{c} {per|{d}%} ',
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
              { value: this.consumption[0], name: 'Jan' },
              { value: this.consumption[1], name: 'Feb' },
              { value: this.consumption[2], name: 'Mar' },
              { value: this.consumption[3], name: 'Apr' },
              { value: this.consumption[4], name: 'May' },
              { value: this.consumption[5], name: 'Jun' },
              { value: this.consumption[6], name: 'Jul' },
              { value: this.consumption[7], name: 'Aug' },
              { value: this.consumption[8], name: 'Sep' },
              { value: this.consumption[9], name: 'Oct' },
              { value: this.consumption[10], name: 'Nov' },
              { value: this.consumption[11], name: 'Dec' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2500
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
</style>
