import axios from '@/utils/axios'

// 报告收款任务-查询（分页）
export function getReportCollectionTaskQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ReportCollectionTask/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告收款任务-新增 or修改
export function getReportCollectionTaskAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ReportCollectionTask/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告收款任务-删除
export function getReportCollectionTaskDelReportCollectionTaskByIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ReportCollectionTask/delReportCollectionTaskByIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告收款创建应收账款信息
export function getCrmAccountsReceivableReportEstablish (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmAccountsReceivable/ReportEstablish', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
