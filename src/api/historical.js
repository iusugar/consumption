import request from '@/utils/request.js'

export function fetchWeekOnlineNumber() {
  return request({
    url: '/historicalStatus/getOnlineNumber',
    method: 'get'
  })
}
