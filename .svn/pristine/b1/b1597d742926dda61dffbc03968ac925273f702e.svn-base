import axios from '@/utils/axios'

// 检测任务查询
export function getDetectionQueryPageTask (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/detection/queryPageTask', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 查询报告编号下所有指标
export function getDetectionQueryAllTarget (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/detection/queryAllTarget', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 实验室质控-查询（分页）
export function getLaboratoryZkQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/LaboratoryZk/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 实验室质控-新增修改
export function getLaboratoryZkAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/LaboratoryZk/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 实验室质控-删除
export function getLaboratoryZkDelLaboratoryZkByIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/LaboratoryZk/delLaboratoryZkByIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 原始记录模板-列表获取
export function getOriginalQueryAllModels (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/original/queryAllModels', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 获取已上传的原始记录列表
export function getOriginalCyQueryFileList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/originalCy/queryFileList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 删除原始记录
export function getOriginalCyDelFile (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/originalCy/delFile', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 标记原始记录
export function getOriginalCySignFile (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/originalCy/signFile', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
