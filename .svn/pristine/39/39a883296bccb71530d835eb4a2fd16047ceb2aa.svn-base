import axios from '@/utils/axios'

export function getFileQueryFileList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/file/queryFileList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getFileDownload (params) {
  return new Promise((resolve, reject) => {
    axios.get(process.env.JS_Server + '/file/download' + params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
export function getFileDelFile (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/file/delFile', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 文件上传 */
export function getFileUpload (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/file/upload', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 文件上传-base64 */
export function getFileUploadBase64 (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/file/uploadBase64', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
