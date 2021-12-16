import request from '@/utils/request.js'

// 设备状态表
// 获取最近一次使用记录
export function fetchLastUseTime() {
  return request({
    url: '/deviceStatus/lastUseTime',
    method: 'get'
  })
}
