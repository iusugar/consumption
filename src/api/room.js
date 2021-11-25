import request from '@/utils/request.js'

export function selectAllBuilding() {
  return request({
    url: '/room/selectBuilding',
    method: 'get'
  })
}

export function fetchAllRoom() {
  return request({
    url: '/room/selectAllRoom',
    method: 'get'
  })
}

export function addRoom(room) {
  return request({
    url: '/room/add',
    method: 'post',
    data: room
  })
}
