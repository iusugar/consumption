import request from '@/utils/request.js'

export function fetchAllGateway() {
  return request({
    url: '/gateway/getAllGateway',
    method: 'get'
  })
}
