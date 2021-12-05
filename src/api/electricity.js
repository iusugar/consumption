import request from '@/utils/request.js'

// 获取昨天插座用电数据
export function fetchYesterdayData(devId) {
  return request({
    url: '/electricityData/getYesterdayData',
    method: 'get',
    params: { devId }
  })
}
// 获取当月用电量
export function getCurMonthConsumption() {
  return request({
    url: '/electricityData/getCurMonthC',
    method: 'get'
  })
}
// 获取上月用电量
export function getLastMonthConsumption() {
  return request({
    url: '/electricityData/getLastMonthC',
    method: 'get'
  })
}
// 结合上面两个
export function getMonthConsumption() {
  return request({
    url: '/electricityData/getMonthC',
    method: 'get'
  })
}
// 获取今日用电和昨日用电
export function getDayConsumption() {
  return request({
    url: '/electricityData/getDayC',
    method: 'get'
  })
}
