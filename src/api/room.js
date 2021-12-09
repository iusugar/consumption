import request from '@/utils/request.js'

// export function selectAllBuilding() {
//   return request({
//     url: '/room/selectBuilding',
//     method: 'get'
//   })
// }

// 获取所有的房间
export function fetchAllRoom() {
  return request({
    url: '/room/selectAllRoom',
    method: 'get'
  })
}
// 添加房间
export function addRoom(room) {
  return request({
    url: '/room/add',
    method: 'post',
    data: room
  })
}
