import axios from '@/utils/axios'

// 查询
export function getPackQueryListPack (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/pack/queryListPack', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 新增或修改包
export function getPackAddOrModifyPack (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/pack/addOrModifyPack', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 删除包
export function getPackDelPack (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/pack/delPack', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 查询包指标明细
export function getPackQueryListPackItem (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/pack/queryListPackItem', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 新增/修改包指标明细
export function getPackAddOrModifyPackItem (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/pack/addOrModifyPackItem', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 删除包指标明细
export function getPackDelPackItem (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/pack/delPackItem', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 查询指标明细 树形
export function getTargetQueryAllTarget (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/target/queryAllTarget', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
