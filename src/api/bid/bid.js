import axios from '@/utils/axios'

/* 招投标分页查询 */
export function getCrmBiddingQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBidding/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新增投标 */
export function getCrmBiddingAddOrModify(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBidding/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 删除投标 */
export function getCrmBiddingDelLByIds(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBidding/delLByIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 审核---分页 */
export function getCrmBiddingToExamineQueryPageData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBidding/toExamineQueryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 审核---审核 */
export function getCheckTaskAddCheckLog(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/checkTask/addCheckLog', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取审核日志明细 */
export function getCrmBiddingToExamineLogDetailed(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBidding/toExamineLogDetailed', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取招投标审核流程 */
export function getPathGetCrmBiddingPath(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/path/get/CrmBidding/Path', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取招投标节点信息 */
export function getCrmBiddingGetNode(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBidding/getNode', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
