import resizeDetector from 'element-resize-detector'

export default {
  mounted() {
    window.addEventListener('resize', () => {
      // this.chart.resize()
    })
    this.chartResize()
  },
  methods: {
    chartResize() {
      let erd = resizeDetector()
      erd.listenTo(this.$el, () => {
        this.chart.resize()
      })
    }
  }
}
