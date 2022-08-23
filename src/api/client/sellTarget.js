import axios from '@/utils/axios'

export function getCrmTargetQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmTarget/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getCrmTargetAddOrModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmTarget/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getCrmTargetDelCrmTargetIds(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmTarget/delCrmTargetIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getCrmReportGetUser(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmReport/getUser', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
