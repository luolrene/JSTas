import axios from '@/utils/axios'

/* 仪器类别树查询 */
export function getMachineQueryMachineTree(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/machine/queryMachineTree', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 仪器完整树查询 */
export function getMachineQueryMachineTreeNew(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/machine/queryMachineTreeNew', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 仪器类别分页查询 */
export function getMachineQueryMachinePage(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/machine/queryMachinePage', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 仪器类别新增或修改 */
export function getMachineAddOrModifyMachineType(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/machine/addOrModifyMachineType', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 仪器明细新增或修改 */
export function getMachineAddOrModifyMachineItem(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/machine/addOrModifyMachineItem', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 删除仪器信息 */
export function getMachineDelMachineData(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/machine/delMachineData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 打包下载仪器附件 */
export function getMachineDownZipFile(params) {
  return new Promise((resolve, reject) => {
    axios.get(process.env.JS_Server + '/machine/downZipFile' + params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 仪器明细分页 */
export function getMachineQueryMachineItemPage(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/machine/queryMachineItemPage', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 获取仪器有效日期 */
export function getMachineQueryYxrqList(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/machine/queryYxrqList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 批量送检 */
export function getMachineToCheck(params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/machine/toCheck', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
