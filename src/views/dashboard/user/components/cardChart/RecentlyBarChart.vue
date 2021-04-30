<!-- 最近七天用电量、平均用电量 -->
<template>
  <div :class='className'
       :style='{height:height,width:width}'></div>
</template>

<script>
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
          trigger: 'axis',
          axisPointer: {
            type: 'none',
            label: {
              backgroundColor: '#000'
            }
          },
          // backgroundColor: '#FFFFFF',
          showContent: true,
          hideDelay: 100,
          confine: true,
          extraCssText: 'background-color: "#ff0000";',
          padding: 5,
          textStyle: {
            color: '#A6A6A6',
            fontWeight: 500,
            fontSize: 12,
            align: 'left'
          }
        },
        grid: {
          left: 15,
          width: '70%',
          containLabel: true
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          itemSize: 12,
          itemGap: 5,
          showTitle: false,
          right: '5%',
          feature: {
            magicType: { show: true, type: ['line', 'bar'] },
            saveAsImage: { show: true }
          },
          iconStyle: {
            borderColor: '#ff9900'
          }
        },
        // calculable: true,
        xAxis: [
          {
            type: 'category',
            data: [
              '周一',
              '周二',
              '周三',
              '周四',
              '周五',
              '周六',
              '周日'
            ],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            scale: true,
            splitNumber: 2,
            axisLabel: {
              color: '#A6A6A6',
              fontWeight: 2,
              fontSize: 10
            }
          }
        ],
        series: [
          {
            name: '电量',
            type: 'bar',
            color: '#ff9900',
            barWidth: '50%',
            showBackground: true,
            data: [26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8],
            // markPoint: {
            //   symbol: 'pin',
            //   symbolSize: 40,
            //   label: {
            //     color: '#FFFFFF',
            //     fontSize: 10
            //   },
            //   data: [
            //     {
            //       name: '周最高',
            //       type: 'max'
            //     },
            //     {
            //       name: '周最低',
            //       type: 'min'
            //     }
            //   ]
            // },
            markLine: {
              data: [{ type: 'average', name: '平均值' }],
              silent: true,
              symbol: 'none',
              precision: 1,
              label: {
                color: '#A6A6A6',
                fontSize: 10
              }
            },
            tooltip: {
              extraCssText: 'background-color: "#000";'
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
