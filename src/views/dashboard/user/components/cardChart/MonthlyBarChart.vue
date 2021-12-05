<!-- dashboard头部的图表 月用电量-->
<template>
  <div :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import { getMonthConsumption } from '@/api/electricity.js'
import * as echarts from 'echarts'
import resize from '../mixins/resize'

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
      default: '80px'
    }
  },
  data() {
    return {
      chart: null,
      currentCsp: 0,
      lastCsp: 0,
      flag: 'monthly'
    }
  },
  activated() {
    this.getMonthCsp()
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
    getMonthCsp() {
      getMonthConsumption().then(response => {
        let cData = response.data
        this.currentCsp = cData.substring(0, cData.indexOf(','))
        this.lastCsp = cData.substring(cData.indexOf(',') + 1)
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        title: {
          text: this.currentCsp + '  kW·h',
          textStyle: {
            color: '#5470c6',
            fontSize: 12,
            fontFamily: 'Arial'
          },
          top: 15
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              backgroundColor: '#000'
            }
          },
          backgroundColor: '#FFFFFF',
          showContent: true,
          hideDelay: 200,
          confine: true,
          padding: 5,
          textStyle: {
            color: '#A6A6A6',
            fontWeight: 500,
            fontSize: 12,
            align: 'left'
          }
        },
        legend: {
          data: ['本月', '上月'],
          orient: 'vertical',
          right: 10,
          bottom: 8,
          itemGap: 5,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#A6A6A6'
          },
          selectedMode: false
        },
        grid: {
          left: 5,
          bottom: 10,
          width: '70%',
          height: '30px'
        },
        xAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            scale: false,
            splitNumber: 3,
            axisLabel: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['']
          }
        ],
        series: [
          {
            name: '本月',
            type: 'bar',
            data: [this.currentCsp],
            showBackground: true,
            itemStyle: {
              borderRadius: [0, 10, 10, 0],
              color: '#91cc75'
            },
            animationEasing: 'cubicInOut',
            animationDuration: 2000
          },
          {
            name: '上月',
            type: 'bar',
            data: [this.lastCsp],
            showBackground: true,
            itemStyle: {
              borderRadius: [0, 10, 10, 0],
              color: '#0066cc'
            },
            animationEasing: 'cubicInOut',
            animationDuration: 2000
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
</style>
