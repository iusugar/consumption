import resizeDetector from 'element-resize-detector'
import {debounce} from '@/utils/debounce.js'

export default {
  mounted() {
    window.addEventListener('resize', () => {
      this.chart.resize()
    })
    // this.chartResize()
  },
  methods: {
    chartResize() {
      let erd = resizeDetector()
      erd.listenTo(this.$el, debounce(() => {
        this.chart.resize()
        console.log('resize')
      }, 100))
    }
  }
}
