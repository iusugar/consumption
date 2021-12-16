import request from '@/utils/request.js'

export function fetchWeekOnlineCount() {
  return request({
    url: '/historicalStatus/getOnlineDeviceCount',
    method: 'get'
  })
}

// 通过设备id获取上下线记录
export function fetchHistoricalActivities(id) {
  return request({
    url: '',
    method: 'get',
    params: { id }
  })
}

// 通过点击heatmap时触发的三个数据点获取在线设备数据
export function fetchPointHistoriesData() {
  return request({
    url: ''
  })
}
