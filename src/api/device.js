import request from '@/utils/request.js'

export function addDevice(device) {
  return request({
    url: '/device/add',
    method: 'post',
    data: device
  })
}

export function checkIsExist(deviceId) {
  return request({
    url: '/device/isExist',
    method: 'get',
    params: { deviceId }
  })
}

export function fetchDevice(room) {
  return request({
    url: '/device/getRoomDevice',
    method: 'get',
    params: { room }
  })
}
