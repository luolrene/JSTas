import axios from '@/utils/axios'

/* 分页查询 */
export function getCrmSaleOpportunityQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSaleOpportunity/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 添加修改 */
export function getCrmSaleOpportunityAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSaleOpportunity/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 删除 */
export function getCrmSaleOpportunityDelCrmSaleOpportunityIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSaleOpportunity/delCrmSaleOpportunityIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取销售机会重要程度标准 金额 */
export function getCrmSaleOpportunityGetImportantStandard (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSaleOpportunity/getImportantStandard', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 修改 销售机会重要程度标准 金额 等级10以上才行 */
export function getCrmSaleOpportunityImportantStandards (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSaleOpportunity/importantStandard', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 节点列表 */
export function getCrmSaleOpportunityNodeQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSaleOpportunityNode/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 删除 */
export function getCrmSaleOpportunityNodeQueryDelByIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSaleOpportunityNode/delByIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 新增修改 */
export function getCrmSaleOpportunityNodeAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSaleOpportunityNode/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
