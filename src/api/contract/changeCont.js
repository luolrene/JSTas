import axios from '@/utils/axios'

// 点位频次/天数联动修改
export function getContTaskChangePcOrDaysToSampTask (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contTask/changePcOrDaysToSampTask', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 新增点位到采样任务
export function getContTaskAddPointsToSampTask (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contTask/addPointsToSampTask', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 将指标新增到某报告任务
export function getContTaskAddTargetsToReportTask (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contTask/addTargetsToReportTask', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 合同变更完成
export function getChangeContFinishJob (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/changeCont/finishJob', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
