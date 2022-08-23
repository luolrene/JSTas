import axios from '@/utils/axios'

/* 查询某合同审核任务的审核日志 */
export function getCheckTaskQueryLogs (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/checkTask/queryLogs', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 增加审核日志（审核操作）
export function getCheckTaskAddCheckLog (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/checkTask/addCheckLog', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* --------------------------------------------------分包合同----------------------------------------------- */
// 合同信息管理 - 分包合同 -分页
export function getSubContQuerySubCont (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/subCont/querySubCont', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 合同分包任务 新增 or 修改
export function getSubContAddOrModifySubCont (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/subCont/addOrModifySubCont', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 合同分包任务明细信息 查询（分页）
export function getSubContDetailQuerySubCont (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/subContDetail/querySubCont', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 合同分包任务明细信息 新增 or 修改
export function getSubContDetailAddOrModifySubContDetail (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/subContDetail/addOrModifySubContDetail', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 合同分包任务明细 删除
export function getSubContDetailDelSubContInfoDetailByIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/subContDetail/delSubContInfoDetailByIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
