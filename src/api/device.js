import request from '@/utils/request.js'

export function addDevice(device) {
  return request({
    url: '/device/add',
    method: 'post',
    data: device
  })
}
