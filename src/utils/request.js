import axios from 'axios'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: 'http://localhost:8090',
  timeout: 5000
  // headers: { contentType: 'application/x-www-form-urlencoded;charset=UTF-8' }
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前的处理
  return config;
}, function (error) {
  // 对请求错误的处理
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对返回数据处理
  return response;
}, function (error) {
  // 对返回错误处理
  console.log('error' + error) // for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error);
});

export default instance
