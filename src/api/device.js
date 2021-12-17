import request from '@/utils/request.js'

// 添加设备
export function addDevice(device) {
  return request({
    url: '/device/add',
    method: 'post',
    data: device
  })
}
// 通过设备23位ID检查设备是否存在
export function checkIsExist(deviceId) {
  return request({
    url: '/device/isExist',
    method: 'get',
    params: { deviceId }
  })
}
// 根据房间号获取设备
export function fetchDevice(room) {
  return request({
    url: '/device/getRoomDevice',
    method: 'get',
    params: { room }
  })
}
// 获取所有设备
export function fetchAllDevice() {
  return request({
    url: '/device/getAllDevice',
    method: 'get'
  })
}
// 根据搜索条件查找设备
export function fetchDeviceList(query) {
  return request({
    url: '/device/getDeviceList',
    method: 'get',
    params: query
  })
}
// 更新设备信息
export function updateDevice(device) {
  return request({
    url: '/device/update',
    method: 'put',
    data: device
  })
}
// 删除设备
export function deleteDevice(device) {
  return request({
    url: '/device/delete',
    method: 'delete',
    data: device
  })
}
