import axios from '@/utils/axios'

/* 字典表 */
export function getSysQueryDict (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/sys/queryDict', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 组织机构切换 */
export function getSysChangeSysOrg (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/sys/changeSysOrg', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 系统操作日志 */
export function getMyLogQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/MyLog/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
