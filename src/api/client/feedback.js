import axios from '@/utils/axios'

// 分页查询
export function getJournalismQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Journalism/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 图片上传
export function getJournalismFileUpload (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Journalism/file/upload', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 图片下载
export function getJournalismileDownload (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Journalism/file/download', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 新增修改
export function getJournalismAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Journalism/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 删除
export function getJournalismDelJournalismIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/Journalism/delJournalismIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
