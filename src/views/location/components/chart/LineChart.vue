<!-- 展示电流电压功率的线性图 -->
<template>
  <div :class="className"
       :style="{width:width,height:height}"></div>
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/views/dashboard/user/components/mixins/resize'
import bus from '@/utils/bus.js'
import { fetchYesterdayData } from '@/api/electricity.js'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      insVoltageList: [],
      insCurrentList: [],
      insPowerList: []
    }
  },
  updated() {
    this.initChart()
  },
  activated() {
    this.getElectricityData()
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
    getElectricityData() {
      bus.$on('checkedDeviceId', e => {
        fetchYesterdayData(e).then(response => {
          var electricityDataList = response.data
          var dateList = []
          this.insVoltageList = []
          this.insCurrentList = []
          this.insPowerList = []
          if (electricityDataList != null && electricityDataList.length > 0) {
            for (let data of electricityDataList) {
              dateList.push(new Date(Date.parse(data.createTime)).getHours())
            }
            for (let i = 0, j = 0; i < 24; i++) {
              if (i === dateList[j] && j < dateList.length) {
                this.insVoltageList[i] = electricityDataList[j].insVoltage
                this.insCurrentList[i] = electricityDataList[j].insCurrent
                this.insPowerList[i] = electricityDataList[j].insPower
                j++
              } else {
                this.insVoltageList[i] = 0
                this.insCurrentList[i] = 0
                this.insPowerList[i] = 0
              }
            }
          }
          this.initChart()
        })
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        color: ['#80FFA5', '#00DDFF', '#FFBF00'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['电流', '电压', '功率'],
          backgroundColor: '#FFFFFFcc',
          borderRadius: 5,
          padding: 15,
          itemGap: 20
        },
        grid: {
          left: '5%',
          right: '3%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '电压',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(128, 255, 165, 1)'
                },
                {
                  offset: 0.9,
                  color: 'rgba(1, 191, 236, 1)'
                }
              ]),
              shadowColor: 'rgba(0, 0, 0, 0.9)'
            },
            emphasis: {
              focus: 'series'
            },
            // data: [221, 220, 230, 226, 210, 220, 231, 200, 210, 210, 221, 220, 230, 226, 210, 220, 231, 200, 210, 210, 218, 220, 219, 231]
            data: this.insVoltageList
          },
          {
            name: '电流',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(0, 221, 255, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(77, 119, 255, 1)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            // data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 650, 700, 600, 400, 390, 480, 678, 560]
            data: this.insCurrentList
          },
          {
            name: '功率',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255, 191, 0, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(224, 62, 76, 1)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            // data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 370, 700, 600, 400, 390, 480, 678, 560]
            data: this.insPowerList
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
</style>
