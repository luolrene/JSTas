import axios from '@/utils/axios'

/* 审批---分页查询 */
export function getCrmResponsibilityQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmResponsibility/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 审批---删除 */
export function getCrmResponsibilityDelLaCrmTrackIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmResponsibility/delLaCrmTrackIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 审批---一键通过 */
export function getCrmResponsibilityBatchPass (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmResponsibility/batchPass', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 审批---一键退回 */
export function getCrmResponsibilityOneClickReturn (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmResponsibility/oneClickReturn', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 报价记录 审核分页查询 */
export function getCrmOfferControlQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOffer/controlQueryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 审核通过 */
export function getCrmOfferAdopt (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOffer/adopt', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 分页查询 */
export function getCrmResponsibilityLxrQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmResponsibility/lxr/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 分页查询 */
export function getCrmResponsibilityLxrToExamine (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmResponsibility/lxr/toExamine', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 开票信息-审核分页查询 */
export function getCrmBillIngToExamineQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBillIng/toExamineQueryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 开票操作 */
export function getCrmBillIngIssue (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBillIng/issue', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
