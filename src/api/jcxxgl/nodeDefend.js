import axios from '@/utils/axios'

export function getReportJdQueryPageList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportJd/queryPageList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getReportJdAddOper (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportJd/addOper', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getReportJdDelOpers (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportJd/delOpers', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 节点的负责人，时间，当前节点查询
export function getReportJdQueryTaskJdShow (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportJd/queryTaskJdShow', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 节点日志查询
export function getReportTaskLogQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTaskLog/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 节点日志新增
export function getReportTaskLogAdd (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTaskLog/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
