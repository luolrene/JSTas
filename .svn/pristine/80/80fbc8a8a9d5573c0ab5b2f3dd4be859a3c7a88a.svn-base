import axios from '@/utils/axios'

// 分页查询
export function getConSultQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/conSult/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 修改
export function getConSultModifyData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/conSult/modifyData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 退回
export function getConSultRetrunBack(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/conSult/retrunBack', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 获取节点信息
export function getConSultGetJdInfo(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/conSult/getJdInfo', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 设置当前节点
export function getConSultSetNowJd(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/conSult/setNowJd', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
