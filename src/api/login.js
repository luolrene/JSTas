import axios from '@/utils/axios'

export function getPageList () {
  return new Promise((resolve, reject) => {
    axios.post(process.env.YH_Server + '/cq/page/list').then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserLogin (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/login', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserLoginout (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/loginout', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getSysRoleMenu () {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/sys/roleMenu').then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserChange (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/change', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getUserGetUserInfo (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/user/getUserInfo', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}