<!-- 最近七天用电量、平均用电量 -->
<template>
  <div :class='className'
       :style='{height:height,width:width}'></div>
</template>

<script>
import { fetchEachDayConsumption } from '@/api/electricity.js'
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
      dateData: [],
      electricityData: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
    this.getEachDayConsumption()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getEachDayConsumption() {
      fetchEachDayConsumption().then(response => {
        console.log(response.data);
        var dataList = response.data
        for (let data of dataList) {
          let date = new Date(Date.parse(data.createTime)).toLocaleString('chinese', { hour12: false }).replace(/\//g, '-')
          this.dateData.push(date.substring(0, date.indexOf(' ')))
          this.electricityData.push(data.consumption)
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
          width: '80%',
          containLabel: true
        },
        // toolbox: {
        //   show: true,
        //   orient: 'vertical',
        //   itemSize: 12,
        //   itemGap: 5,
        //   showTitle: false,
        //   right: '5%',
        //   // feature: {
        //   //   magicType: { show: true, type: ['line', 'bar'] },
        //   //   saveAsImage: { show: true }
        //   // },
        //   iconStyle: {
        //     borderColor: '#ff9900'
        //   }
        // },
        // calculable: true,
        xAxis: [
          {
            type: 'category',
            data: this.dateData,
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
            barGap: '5%',
            barCategoryGap: '5%',
            showBackground: true,
            data: this.electricityData,
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
