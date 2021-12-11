import request from '@/utils/request.js'

export function fetchAllLocation() {
  return request({
    url: '/location/getAll',
    method: 'get'
  })
}

export function fetchLocationByRoom(room) {
  return request({
    url: '/location/getByRoom',
    method: 'get',
    params: { room }
  })
}
