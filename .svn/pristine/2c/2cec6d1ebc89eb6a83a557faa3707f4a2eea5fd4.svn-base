import axios from '@/utils/axios'

/* 分页查询客户联系人 */
export function getCustContactsQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/Contacts/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新增修改联系人 */
export function getCustAddOrModifyContacts (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/addOrModifyContacts', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 删除联系人 */
export function getCustDelContacts (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/cust/delContacts', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
