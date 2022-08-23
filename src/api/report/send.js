import axios from '@/utils/axios'

// 查询（分页）
export function getReportMailTaskQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ReportMailTask/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 修改
export function getReportMailTaskAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ReportMailTask/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 删除
export function getReportMailTaskDelReportMailTaskByIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ReportMailTask/delReportMailTaskByIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
