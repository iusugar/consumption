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
    url: '/historicalStatus/deviceActivitiesData',
    method: 'get',
    params: { id }
  })
}
// 获取最近设备上下线记录
export function fetchRecentlyActivities() {
  return request({
    url: '/historicalStatus/recentlyActivitiesData',
    method: 'get'
  })
}

// 通过点击heatmap时触发的三个数据点获取在线设备数据
export function fetchPointHistoriesData() {
  return request({
    url: ''
  })
}
