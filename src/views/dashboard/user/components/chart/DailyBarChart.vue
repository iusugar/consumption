<!-- dashboard头部的图表 日用电量 -->
<template>
  <div :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
// import resizeDetector from 'element-resize-detector'
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
      todayCsp: 13,
      samedayCsp: 35
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
    this.watchSize()
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
      console.log('启动')
      document.querySelector('.chart').resize(function(){
        
      })
      // var erd = resizeDetector()
      // // const _this1 = this
      // // console.log('daily this' + this.chart)
      // erd.listenTo(document.getElementsByClassName('chart'), function (element) {
      //   console.log(111)
      //   // _this1.chart.resize()
      //   console.log(333)
      // })
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
          data: ['今日', '同期'],
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
            }
          },
          {
            name: '同期',
            type: 'bar',
            data: [this.samedayCsp],
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
