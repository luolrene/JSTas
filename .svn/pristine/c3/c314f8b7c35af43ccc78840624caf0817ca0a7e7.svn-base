import axios from '@/utils/axios'

export function getIndusQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/indus/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getIndusAddOrModifyIndustry (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/indus/addOrModifyIndustry', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function getIndusDelIndus (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/indus/delIndus', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getIndusQueryIndusTree (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/indus/queryIndusTree', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
