<!-- dashboard头部的图表 月用电量-->
<template>
  <div :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
import resizeDetector from 'element-resize-detector'
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
      currentCsp: 125,
      lastCsp: 148
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
      // var erd = resizeDetector()
      // const _this = this
      // console.log('monthly this' + _this.chart.xAxis)
      // erd.listenTo(document.getElementsByClassName('chart'), function (element) {
      //   console.log(222)
      //   _this.chart.resize()
      //   console.log(444)
      // })
    })
    // window.onresize = () => {
    //   return (() => {
    //     this.chart.resize()
    //   })()
    // }
    // window.addEventListener('resize', () => {
    //   this.chart.resize()
    // })
    // this.watchSize()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    watchSize() {
      var erd = resizeDetector()
      // const _this = this
      console.log('monthly this' + this.chart)
      erd.listenTo(document.getElementsByClassName('chart'), function (element) {
        console.log(222)
        // _this.chart.resize()
        console.log(444)
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
            }
          },
          {
            name: '上月',
            type: 'bar',
            data: [this.lastCsp],
            showBackground: true,
            itemStyle: {
              borderRadius: [0, 10, 10, 0],
              color: '#0066cc'
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
</style>
