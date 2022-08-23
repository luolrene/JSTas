import axios from '@/utils/axios'

export function getRoleQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/role/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getRoleModifyRole (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/role/modifyRole', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getRoleAddRole (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/role/addRole', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getRoleDelRoles (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/role/delRoles', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 菜单列表 */
export function getSysAllMenu (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/sys/allMenu', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 保存菜单 */
export function getRoleAddRights (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/role/addRights', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
