import axios from '@/utils/axios'

/* 分页获取列表 */
export function getGroupQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/group/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取所有数据 */
export function getGroupQueryAllGroups (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/group/queryAllGroups', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 构造好的树形数据 */
export function getGroupQueryAllGroupsTree (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/group/queryAllGroupsTree', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getGroupMmodifyGroup (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/group/modifyGroup', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getGroupAddGroup (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/group/addGroup', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getGroupDelGroup (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/group/delGroup', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
