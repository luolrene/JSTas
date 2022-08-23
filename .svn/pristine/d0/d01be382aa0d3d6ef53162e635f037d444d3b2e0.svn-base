import axios from '@/utils/axios'

/* 分页查询项目到期 */
export function getCrmProjectTipsQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmProjectTips/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新增修改 */
export function getCrmProjectTipsAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmProjectTips/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 删除 */
export function getCrmProjectTipsDelCrmProjectTipsIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmProjectTips/delCrmProjectTipsIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
