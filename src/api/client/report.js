import axios from '@/utils/axios'

// 个人报告-分页查询
export function getCrmReportQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmReport/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 个人报告-新增
export function getCrmReportAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmReport/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 工作报告指派-分页查询
export function getCrmReportArrangementQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmReportArrangement/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 工作报告指派-新增
export function getCrmReportArrangementAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmReportArrangement/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 获得当前用户所在部门所有用户
export function getCrmReportArrangementGetGroupUser (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmReportArrangement/getGroupUser', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
