import axios from '@/utils/axios'

/* 分页获取列表 */
export function getCrmAchievementQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmAchievement/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 修改评价 */
export function getCrmAchievementModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmAchievement/Modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 实验室样品查询 */
export function getCrmAchievementSumQuerySampTargetPage (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmAchievementSum/querySampTargetPage', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
