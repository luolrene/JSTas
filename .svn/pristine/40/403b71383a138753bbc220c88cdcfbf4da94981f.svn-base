import axios from '@/utils/axios'

// 报告任务-分配处理人员
export function getReportTaskToOper (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/toOper', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 启动报告任务
export function getReportTaskStartReportTask (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/startReportTask', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 方案查看(报告/采样)
export function getReportTaskQueryCaseShow (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/queryCaseShow', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 指标方法修改
export function getReportTaskUpdateReportTargetFun (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/updateReportTargetFun', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 根据报告编号查询单挑报告任务详情
export function getReportTaskQueryTaskByReportNo (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/queryTaskByReportNo', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
