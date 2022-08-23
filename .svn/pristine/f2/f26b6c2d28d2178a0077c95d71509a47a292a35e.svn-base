import axios from '@/utils/axios'

/* 一键租赁 */
export function getLeaseTaskAllLeaseTaskOpen (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/LeaseTask/allLeaseTaskOpen', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 一键归还 */
export function getLeaseTaskAllLeaseTaskEnd (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/LeaseTask/allLeaseTaskEnd', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
