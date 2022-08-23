import axios from '@/utils/axios'

export function getUserQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserDelUsers (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/delUsers', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 内勤用户列表
export function getUserQueryBackOffice (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/queryBackOffice', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserAddBackOffice (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/addBackOffice', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getUserDelBackOffice (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/delBackOffice', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 用户管理-批量重置密码
export function getUserResetPassword (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/resetPassword', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 用户管理-批量解冻用户
export function getUserChangeFreeze (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/changeFreeze', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 用户管理-批量冻结用户
export function getUserFreeze (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/Freeze', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
