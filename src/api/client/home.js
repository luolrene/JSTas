import axios from '@/utils/axios'

// 概况统计
export function getCrmSysOutline (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSys/outline', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 业绩对比
export function getCrmSysChartOne (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSys/chartOne', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 销售机会
export function getCrmSysChartTwo (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSys/chartTwo', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 客户统计
export function getCrmSysChartThree (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSys/chartThree', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 业绩目标
export function getCrmSysSalesStatistics (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSys/salesStatistics', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 根据当前用户等级 获取指定部门ID 下的用户
export function getCrmSysGetUserAll (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSys/getUserAll', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 获取部门信息-树结构
export function getCrmSysDepartmentTree (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSys/departmentTree', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 获取部门信息-列表结构
export function getCrmSysDepartment (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmSys/department', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
