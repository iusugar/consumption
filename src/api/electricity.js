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
export function fetchMonthConsumption() {
  return request({
    url: '/electricityData/getMonthC',
    method: 'get'
  })
}
// 获取今日用电和昨日用电
export function fetchDayConsumption() {
  return request({
    url: '/electricityData/getDayC',
    method: 'get'
  })
}
// 获取一年的用电量(12个月)
export function fetchYearConsumption() {
  return request({
    url: '/electricityData/getYearC',
    method: 'get'
  })
}
// 获取指定日期一天的功率变化
export function fetchDayTotalPower() {
  return request({
    url: '/electricityData/getDayTotalPower',
    method: 'get'
  })
}
// 获取近七天用电最多的六个设备
export function fetchConsumedMost() {
  return request({
    url: '/electricityData/getConsumedMost',
    method: 'get'
  })
}
// 获取近七天每天的耗电量
export function fetchEachDayConsumption() {
  return request({
    url: '/electricityData/getEachDayConsumption',
    method: 'get'
  })
}
