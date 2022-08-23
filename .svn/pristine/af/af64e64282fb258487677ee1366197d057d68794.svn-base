import axios from '@/utils/axios'

// 根据检测指标查询检测方法
export function getTargetQueryFuns (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/target/queryFuns', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 切换检测方法里面的是否默认
export function getTargetUpdateFun (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/target/updateFun', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* ------------------------------------- 指标价格维护 ---------------------------------------------- */
// 分页查询
export function getTargetPriceQueryPageList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/TargetPrice/queryPageList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 新增/修改
export function getTargetPriceAddOrModifyData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/TargetPrice/addOrModifyData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 删除数据
export function getTargetPriceDelDatas (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/TargetPrice/delDatas', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 查询价格树
export function getTargetPriceQueryTargetTree (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/TargetPrice/queryTargetTree', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}