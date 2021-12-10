import request from '@/utils/request.js'

export function fetchAllLocation() {
  return request({
    url: '/location/getAll',
    method: 'get'
  })
}
