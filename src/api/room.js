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
// 添加房间 transfer组件添加使用
export function addRoom(room) {
  return request({
    url: '/room/add',
    method: 'post',
    data: room
  })
}
// tree组件添加使用
export function addNewRoom(room) {
  return request({
    url: '/room/addNew',
    method: 'post',
    data: room
  })
}
// 组件点击房间名查询详细数据
export function fetchRoomInfo(name, id) {
  return request({
    url: '/room/getRoomInfo',
    method: 'get',
    params: { name, id }
  })
}
// 更新房间信息
export function updateRoomInfo(room) {
  return request({
    url: '/room/updateRoom',
    method: 'put',
    data: room
  })
}
// 删除一个房间
export function deleteRoom(id) {
  return request({
    url: '/room/deleteRoom',
    method: 'delete',
    params: { id }
  })
}
