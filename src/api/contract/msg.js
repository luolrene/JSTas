import axios from '@/utils/axios'

// 查询
export function getContractQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contract/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 新增编辑
export function getContractAddOrModifyContract (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contract/addOrModifyContract', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 查看详情
export function getContractQueryContractById (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contract/queryContractById', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 合同任务下的所有任务-树形
export function getContractQueryStructure (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contract/queryStructure', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 审核
export function getContractSubmitToCheck (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contract/submitToCheck', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 周期合同完成
export function getContractFinishContract (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contract/finishContract', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 放弃合同
export function getContractDropContract (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contract/dropContract', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 凭借经办人查询考勤内勤
export function getContractGetBackOfficeUser (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contract/getBackOfficeUser', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 合同备注评论-查询
export function getContractRemarksQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ContractRemarks/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 合同-备注评论-新增
export function getContractRemarksAddRemarks (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/ContractRemarks/addRemarks', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 导出-字段列表
export function getContGetContColumns (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cont/getContColumns', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* -------------------------------------------- 方案 ------------------------------------------ */
// 新增/修改方案
export function getContProgramAddOrModifyProgram (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contProgram/addOrModifyProgram', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 删除方案
export function getContProgramDelPrograms (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contProgram/delPrograms', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 分页查询
export function getContProgramQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contProgram/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* -------------------------------------------- 合同变更 ------------------------------------------ */
// 合同变更查询（分页）
export function getChangeContQueryPageList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/changeCont/queryPageList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 合同变更新增/修改
export function getChangeContAddOrModifyData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/changeCont/addOrModifyData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 合同变更提交/放弃操作
export function getChangeContCommitOrGiveup (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/changeCont/commitOrGiveup', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 合同流程节点获取
export function getContGetJdInfo (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cont/getJdInfo', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 我审核的合同
export function getMyContractQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/MyContract/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 获取合同下的开票金额
export function getCrmBillIngGetSumMoneyByContId (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmBillIng/getSumMoneyByContId', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
