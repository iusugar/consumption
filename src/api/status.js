import request from '@/utils/request.js'

export function fetchLastUseTime() {
  return request({
    url: '/deviceStatus/lastUseTime',
    method: 'get'
  })
}
