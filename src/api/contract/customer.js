import axios from '@/utils/axios'

export function getCustQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getCustAddOrModifyCust (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/addOrModifyCust', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getCustDelCusts (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/delCusts', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 客户合同总金额，生产总额 */
export function getCustQueryMoney (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/queryMoney', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getCustQueryCustomerById (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/queryCustomerById', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新增联系人 */
export function getCustAddOrModifyContacts (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/addOrModifyContacts', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新增跟进人 */
export function getCustAddOrModifyOpers (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/addOrModifyOpers', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 查询联系人 */
export function getCustQueryContacts (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/queryContacts', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 查询跟进人 */
export function getCustQueryOpers (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/queryOpers', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 删除联系人 */
export function getCustDelContacts (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/delContacts', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 删除跟进人 */
export function getCustDelOpers (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/delOpers', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
