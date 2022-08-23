import axios from '@/utils/axios'

// 分页查询
export function getAreaPriceQueryList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/AreaPrice/queryList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 新增/修改
export function getAreaPriceAddOrModifyData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/AreaPrice/addOrModifyData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 删除
export function getAreaPriceDelDatas (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/AreaPrice/delDatas', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
