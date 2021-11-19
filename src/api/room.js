import request from '@/utils/request.js'

export function selectAllBuilding() {
  return request({
    url: '/room/selectBuilding',
    method: 'get'
  })
}

export function selectAllRoom() {
  return request({
    url: '/room/selectAllRoom'
  })
}
