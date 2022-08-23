import axios from '@/utils/axios'

/* 分页查询 */
export function getCrmVisitorQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmVisitor/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 查询指定id */
export function getCrmVisitorGetDateById (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmVisitor/getDateById', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新增访客计划 */
export function getCrmVisitorAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmVisitor/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 删除访客计划 */
export function getCrmVisitorDelCrmVisitorIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmVisitor/delCrmVisitorIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取行业树 */
export function getIndusQueryIndusTree (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/indus/queryIndusTree', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 根据行业ID获取该行业下客户 */
export function getCustGetCustomerByIndustry (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/getCustomerByIndustry', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 批量创建访客计划 */
export function getCrmVisitorBatchAdd (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmVisitor/batchAdd', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
