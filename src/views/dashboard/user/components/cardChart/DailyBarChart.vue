<!-- dashboard头部的图表 日用电量 -->
<template>
  <div :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import { getDayConsumption } from '@/api/electricity.js'
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
      todayCsp: 0,
      yesterdayCsp: 0,
      flag: 'daily'
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
    this.getDayCsp()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getDayCsp() {
      getDayConsumption().then(response => {
        console.log(response);
        let cData = response.data
        this.todayCsp = cData.substring(0, cData.indexOf(','))
        this.yesterdayCsp = cData.substring(cData.indexOf(',') + 1)
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        title: {
          text: this.todayCsp + ' kW·h',
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
          data: ['今日', '昨日'],
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
            name: '今日',
            type: 'bar',
            data: [this.todayCsp],
            showBackground: true,
            itemStyle: {
              borderRadius: [0, 10, 10, 0],
              color: '#ff9900'
            },
            animationEasing: 'cubicInOut',
            animationDuration: 2000
          },
          {
            name: '昨日',
            type: 'bar',
            data: [this.yesterdayCsp],
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
