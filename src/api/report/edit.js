import axios from '@/utils/axios'

// 查询（分页）
export function getReportEditQueryPageList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportEdit/queryPageList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 退回
export function getReportEditReturnToCheck (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportEdit/returnToCheck', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 修改
export function getReportEditModifyData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportEdit/modifyData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 提交审核
export function getReportEditCommitToCheck (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportEdit/commitToCheck', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告退回到检测任务
export function getDetectionFinishMyJob (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/detection/finishMyJob', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告模板获取
export function getMyreportGetReportModels (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/myreport/getReportModels', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告生成接口
export function getMyreportProduct (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/myreport/product', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告认领接口
export function getReportEditGetmyTask (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportEdit/getmyTask', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
