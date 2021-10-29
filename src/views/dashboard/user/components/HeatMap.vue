<!-- 使用热力图的形式展示每个小时插座使用量 -->
<template>
  <div :class="className"
       :style="{width:width,height:height}"></div>
</template>

<script>
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
      const hours = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

      const days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
      // 第一个参数代表日期 从数组顺序为准，从0开始，第二个代表时间从0到23点,第三个是数量
      const data = [[0, 0, 25], [0, 1, 51], [0, 2, 10], [0, 3, 40], [0, 4, 80], [0, 5, 78], [0, 6, 14], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 70], [0, 11, 52], [0, 12, 24], [0, 13, 51], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 43], [0, 22, 22], [0, 23, 75], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 40], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 70], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 56], [1, 17, 7], [1, 18, 88], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 57], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 71], [2, 13, 69], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 82], [2, 23, 4], [3, 0, 67], [3, 1, 3], [3, 2, 60], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 77], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 99], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 81], [4, 6, 70], [4, 7, 0], [4, 8, 50], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 72], [4, 13, 64], [4, 14, 44], [4, 15, 14], [4, 16, 12], [4, 17, 41], [4, 18, 18], [4, 19, 35], [4, 20, 63], [4, 21, 27], [4, 22, 93], [4, 23, 0], [5, 0, 12], [5, 1, 51], [5, 2, 40], [5, 3, 43], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 120], [5, 14, 5], [5, 15, 77], [5, 16, 31], [5, 17, 66], [5, 18, 80], [5, 19, 65], [5, 20, 3], [5, 21, 4], [5, 22, 42], [5, 23, 10], [6, 0, 61], [6, 1, 0], [6, 2, 40], [6, 3, 50], [6, 4, 90], [6, 5, 0], [6, 6, 40], [6, 7, 0], [6, 8, 60], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 50], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 52], [6, 22, 2], [6, 23, 86]]
        .map(function (item) {
          return [item[1], item[0], item[2] || '-'];
        });
      let yAxisVal = ''; // 定义y轴变量
      let xAxisVal = ''; // 定义x轴变量

      this.chart = echarts.init(this.$el)
      this.chart.setOption({
        tooltip: {
          position: 'top',
          trigger: 'item',
          formatter(e) {
            return `${yAxisVal}${xAxisVal}时 <br/> ${(e.data && e.data[2]) || '无'} `;
          }
        },
        grid: {
          height: '55%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: hours,
          splitArea: {
            show: true
          },
          axisLabel: {
            margin: 10,
            color: '#00000099'
          },
          axisPointer: {
            show: true,
            type: 'none',
            trigger: 'item',
            label: {
              formatter(e) {
                xAxisVal = e.value; // 重点：获取x轴的值
                return e.value
              }
            }
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          splitArea: {
            show: true
          },
          axisLabel: {
            margin: 15,
            color: '#00000099'
          },
          axisPointer: {
            show: true,
            type: 'none',
            trigger: 'item',
            splitLine: {
              show: false
            },
            label: {
              formatter(e) {
                yAxisVal = e.value; // 重点：获取y轴的值
                return e.value
              }
            }
          }
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '10%'
        },
        series: [
          {
            type: 'heatmap',
            data: data,
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
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
