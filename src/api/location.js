import request from '@/utils/request.js'

// 查找所有位置
export function fetchAllLocation() {
  return request({
    url: '/location/getAll',
    method: 'get'
  })
}
// 根据房间名查询点位
export function fetchLocationByRoom(room) {
  return request({
    url: '/location/getByRoom',
    method: 'get',
    params: { room }
  })
}
// 根据id和位置查询
export function fetchLocationInfo(location, id) {
  return request({
    url: '/location/getLocationInfo',
    method: 'get',
    params: { location, id }
  })
}
// 修改位置信息
export function updateLocationInfo(location) {
  return request({
    url: '/location/updateLocationInfo',
    method: 'put',
    data: location
  })
}
// 删除一条位置信息
export function deleteLocation(id) {
  return request({
    url: '/location/deleteLocation',
    method: 'delete',
    params: { id }
  })
}
