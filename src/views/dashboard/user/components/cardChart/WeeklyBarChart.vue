<!-- 一周用电最多的插座统计 -->
<template>
  <div :class="className"
       :style="{width:width,height:height}"></div>
</template>

<script>
import { fetchConsumedMost } from '@/api/electricity.js'
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
      deviceData: ['', '', '', '', '', ''],
      electricityData: [0, 0, 0, 0, 0, 0]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
    this.getConsumedMost()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getConsumedMost() {
      fetchConsumedMost().then(response => {
        this.deviceData = []
        this.electricityData = []
        var electricityData = response.data
        for (let data of electricityData) {
          this.deviceData.push(data.deviceId)
          this.electricityData.push(data.consumption);
        }
        this.initChart()
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            label: {
              backgroundColor: '#000'
            }
          },
          backgroundColor: '#FFFFFF',
          showContent: true,
          hideDelay: 100,
          confine: true,
          padding: 5,
          textStyle: {
            color: '#A6A6A6',
            fontWeight: 500,
            fontSize: 12,
            align: 'left'
          }
        },
        // legend: {
        //   data: ['s1', 's2', 's3', 's4', 's5', 's6', 's7']
        // },
        grid: {
          left: 15,
          width: '85%',
          // bottom: 10,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // data: ['插座1', '插座2', '插座3', '插座4', '插座5', '插座6'],
          data: this.deviceData,
          // boundaryGap: false,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          scale: true,
          splitNumber: 1,
          axisLabel: {
            color: '#A6A6A6',
            fontWeight: 2,
            fontSize: 10
          }
        },
        series: [
          {
            data: [
              {
                value: this.electricityData[0],
                itemStyle: {
                  color: '#5470c6'
                }
              },
              {
                value: this.electricityData[1],
                itemStyle: {
                  color: '#5470c6'
                }
              },
              {
                value: this.electricityData[2],
                itemStyle: {
                  color: '#5470c6'
                }
              },
              {
                value: this.electricityData[3],
                itemStyle: {
                  color: '#5470c6'
                }
              },
              {
                value: this.electricityData[4],
                itemStyle: {
                  color: '#5470c6'
                }
              },
              {
                value: this.electricityData[5],
                itemStyle: {
                  color: '#5470c6'
                }
              }
            ],
            type: 'bar',
            barWidth: '50%',
            showBackground: true,
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
