import axios from '@/utils/axios'

/* 分页查询 */
export function getCrmTrackQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmTrack/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新增跟踪记录 */
export function getCrmTrackAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmTrack/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 查询抄送人 */
export function gettransmitUserIdsGet (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/transmitUserIds/get', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 修改抄送人 */
export function gettransmitUserIdsModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/transmitUserIds/modify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
