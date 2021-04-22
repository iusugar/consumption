<!-- echats -->
<template>
  <div id="main"
       ref="chart">
  </div>
</template>

<script>
var echarts = require('echarts');
require('echarts/theme/macarons') // echarts theme

export default {
  data() {
    return {
    }
  },
  mounted() {
    // this.$nextTick(function () {
    //   console.log(this.$el);
    //   console.log(this.$refs.chart);
    // })
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$el, 'macarons');
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }
}
</script>

<style scoped>
#main {
  height: 300px;
}
</style>
