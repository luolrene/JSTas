import axios from '@/utils/axios'

/* 分页查询 */
export function getCrmAchievementSumQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmAchievementSum/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 修改 */
export function getCrmAchievementSumModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmAchievementSum/Modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取报告室参数 */
export function getCrmAchievementSumSzGetAll (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmAchievementSum/sz/getAll', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 设置值 */
export function getCrmAchievementSumSzUpdateDictItem (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmAchievementSum/sz/updateDictItem', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
