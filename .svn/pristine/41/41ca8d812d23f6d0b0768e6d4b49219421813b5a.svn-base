import axios from '@/utils/axios'

/* 开票信息 分页 */
export function getCrmBillIngQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBillIng/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 开票信息 新增 */
export function getCrmBillIngAdd (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBillIng/add', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 开票信息 删除 */
export function getCrmBillIngDelByIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBillIng/delByIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 獲取部門信息 */
export function getGroupQueryAllGroupsTreeById (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/group/queryAllGroupsTreeById', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 获取10次开票信息 */
export function getCrmBillIngGetDataByContId (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBillIng/getDataByContId', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 开票信息 节点信息 */
export function getCrmBillIngGetNode (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBillIng/getNode', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 开票步骤审核明细 */
export function getCrmBillIngToExamineLogDetailed (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBillIng/toExamineLogDetailed', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 提交审核 */
export function getCrmBillIngSubmitAuditing (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBillIng/submitAuditing', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
