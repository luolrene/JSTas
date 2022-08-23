import axios from '@/utils/axios'

// 查询（分页）
export function getReportFileSaveQueryPageList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportFileSave/queryPageList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 编辑
export function getReportFileSaveModifyData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportFileSave/modifyData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}