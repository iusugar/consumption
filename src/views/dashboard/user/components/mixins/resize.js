import resizeDetector from 'element-resize-detector'

export default {
  mounted() {
    window.addEventListener('resize', () => {
      this.chart.resize()
    })
    // this.watchSize()
  },
  methods: {
    watchSize() {
      var erd = resizeDetector()
      const _this = this
      erd.listenTo(document.getElementsByClassName('chart'), function (element) {
        _this.chart.resize()
      })
    }
  }
}
