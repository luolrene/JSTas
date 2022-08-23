import axios from '@/utils/axios'

export function getPathQueryAllPath (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/path/queryAllPath', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getPathAddOrModifyPath (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/path/addOrModifyPath', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getPathDelPaths (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/path/delPaths', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getPathAddPathItems (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/path/addPathItems', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getPathQueryPathItems (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/path/queryPathItems', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getPathGetCrmBiddingPath (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/path/get/CrmBidding/Path', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
