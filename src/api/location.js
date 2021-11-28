import request from '@/utils/request.js'

export function fetchYesterdayData(devId) {
  return request({
    url: '/electricityData/getYesterdayData',
    method: 'get',
    params: { devId }
  })
}
