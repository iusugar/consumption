<!-- 昨日用电功率分布图 -->
<template>
  <div :class="className"
       :style="{width:width,height:height}">
  </div>
</template>

<script>
import { fetchDayTotalPower } from '@/api/electricity.js'
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
      powerData: []
    }
  },
  activated() {
    this.$nextTick(() => {
      this.initChart()
    })
    this.getDayTotalPower()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getDayTotalPower() {
      fetchDayTotalPower().then(response => {
        this.powerData = response.data
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        title: {
          text: '昨日用电功率',
          textStyle: {
            color: '#3B5998',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} kW'
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [{
            lte: 5,
            color: 'green'
          }, {
            gt: 5,
            lte: 7,
            color: 'red'
          }, {
            gt: 7,
            lte: 17,
            color: 'green'
          }, {
            gt: 17,
            lte: 20,
            color: 'red'
          }, {
            gt: 20,
            color: 'green'
          }]
        },
        series: [
          {
            name: '用电功率',
            type: 'line',
            smooth: true,
            // data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400, 390, 480, 678, 560],
            data: this.powerData,
            markArea: {
              itemStyle: {
                color: 'rgba(255, 173, 177, 0.4)'
              },
              data: [[{
                name: '早高峰',
                xAxis: '05:00'
              }, {
                xAxis: '07:00'
              }], [{
                name: '晚高峰',
                xAxis: '17:00'
              }, {
                xAxis: '20:00'
              }]]
            },
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
