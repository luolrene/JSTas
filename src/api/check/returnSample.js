import axios from '@/utils/axios'

// 样品退回分页查询
export function getSyReturnQueryList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/syReturn/queryList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 完成
export function getSyReturnFinishJob (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/syReturn/finishJob', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 样品查看
export function getSyReturnQuerySampNo (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/syReturn/querySampNo', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 导出样品
export function getSyReturnLoadOutSampNo (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/syReturn/loadOutSampNo', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 导入修改
export function getSyReturnLoadin (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/syReturn/loadin', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
