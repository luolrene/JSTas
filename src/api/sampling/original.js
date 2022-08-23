import axios from '@/utils/axios'

// 原始记录模板分页查询
export function getOriginalCyQueryPageList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/originalCy/queryPageList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 原始记录修改
export function getOriginalCyModifyData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/originalCy/modifyData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 完成报告退回的记录
export function getOriginalCyFinishMyJob (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/originalCy/finishMyJob', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 原始记录列表查询
export function getOxcQueryList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/oxc/queryList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 原始记录列表标记
export function getOxcSignFile (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/oxc/signFile', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 原始记录复制到别的报告编号
export function getOriginalCyCopyOldFile (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/originalCy/copyOldFile', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 新增修改
export function getOxcAddOrModifyData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/oxc/addOrModifyData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 复制
export function getOxcCopyData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/oxc/copyData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 数据删除
export function getOxcDelData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/oxc/delData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 批量保存指标
export function getOxcSaveDatas (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/oxc/saveDatas', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
