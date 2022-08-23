import axios from 'axios'
import store from '../store'
// import router from '../router'
import { Message, MessageBox } from 'element-ui'
// import { MessageBox } from 'element-ui'

axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 180000,
  withCredentials: true
})

// 请求拦截器配置
service.interceptors.request.use(config => {
  if (store.getters.userInfo) {
    config.headers['token'] = store.getters.userInfo.token
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code === 0) {
      return response
    } else if (response.data.code === 33) {
      return response
    } else {
      if (response.data.code === 20) {
        MessageBox.confirm(response.data.message, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.clear()
          sessionStorage.removeItem('userInfo')
          location.reload()
          return Promise.reject(response.data.message)

          // localStorage.clear()
          // sessionStorage.removeItem('userInfo')
          // router.push('/login')
          // location.reload()
        }).catch(() => {

        })
      } else {
        Message({
          showClose: true,
          message: response.data.message,
          type: 'error',
          duration: 2000
        })

      }
    }
  },
  error => {
    if (error.response) {
      Message({
        showClose: true,
        message: error.response.status,
        type: 'error',
        duration: 2000
      })
    } else {
      Message({
        showClose: true,
        message: error,
        type: 'error',
        duration: 2000
      })
    }
    return Promise.reject(error)
  }
)

export default service
