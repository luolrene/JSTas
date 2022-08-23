import axios from '@/utils/axios'

/* 报价记录分页查询 */
export function getCrmOfferQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOffer/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 报价记录新增修改 */
export function getCrmOfferAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOffer/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 报价记录删除 */
export function getCrmOfferDelCrmOfferIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOffer/delCrmOfferIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报价记录节点信息
export function getCrmOfferGetNode (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOffer/getNode', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/*-------------------------------------- 报价记录点位指标  ----------------------------------------*/
// 点位树查询
export function getCrmOfferPointQueryPointTree (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOfferPoint/queryPointTree', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 点位分页查询
export function getCrmOfferPointQueryPointPage (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOfferPoint/queryPointPage', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 新增修改点位
export function getCrmOfferPointAddOrModifyPoint (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOfferPoint/addOrModifyPoint', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 复制点位
export function getCrmOfferPointCopyPoint (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOfferPoint/copyPoint', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 删除点位
export function getCrmOfferPointDelPoints (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOfferPoint/delPoints', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 点位下指标分页查询
export function getCrmOfferPointQueryTargetPage (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOfferPoint/queryTargetPage', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 新增修改点位下指标
export function getCrmOfferPointAddOrModifyTarget (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOfferPoint/addOrModifyTarget', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 批量添加指标
export function getCrmOfferPointSaveTargets (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOfferPoint/saveTargets', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 删除指标
export function getCrmOfferPointDelTargets (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOfferPoint/delTargets', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报价记录提交接口
export function getCrmOfferSubmit (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOffer/submit', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 再次报价
export function getCrmOfferPointCopyOffer (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmOfferPoint/copyOffer', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
