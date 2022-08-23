import axios from '@/utils/axios'

export function getSysQueryWorkbench (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/sys/queryWorkbench', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 分页查询
export function getMsgQueryPageList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/msg/queryPageList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 删除
export function getMsgDelMsgs (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/msg/delMsgs', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 修改单条数据为已读
export function getMsgSetMsgHasRead (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/msg/setMsgHasRead', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 单条查询信息
export function getMsgQueryOneMsgById (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/msg/queryOneMsgById', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 单条数量
export function getMsgQueryNoReadNum (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/msg/queryNoReadNum', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
