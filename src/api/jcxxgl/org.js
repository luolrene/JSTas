import axios from '@/utils/axios'

export function getOrgQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/org/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getOrgModifyOrg (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/org/modifyOrg', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getOrgAddOrg (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/org/addOrg', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getOrgDelOrg (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/org/delOrg', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
