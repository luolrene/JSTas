import axios from '@/utils/axios'

// 查询主任务-分页
export function getMainTaskQueryPageList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/mainTask/queryPageList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 新增/修改主任务
export function getMainTaskAddOrModifyTask (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/mainTask/addOrModifyTask', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 主任务退回
export function getMainTaskBackTask (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/mainTask/backTask', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 人员分配
export function getMainTaskToOper (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/mainTask/toOper', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告任务-分页
export function getReportTaskQueryPageList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/queryPageList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告任务-新增/修改
export function getReportTaskAddOrModifyReport (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/addOrModifyReport', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 启动报告任务
export function getReportTaskStartReportTask (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/startReportTask', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告任务-点位新增
export function getReportTaskAddReportPoint (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/addReportPoint', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告任务-删除点位
export function getReportTaskDelReportPoint (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/delReportPoint', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告任务-点位查询
export function getReportTaskQueryPagePoint (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/queryPagePoint', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告任务-检测点位指标新增
export function getReportTaskAddReportTarget (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/addReportTarget', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告任务-删除点位指标
export function getReportTaskDelReportPointTarget (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/delReportPointTarget', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告任务-查询点位指标信息（分页）
export function getReportTaskQueryPagePointTarget (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/queryPagePointTarget', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 报告编号下得所有指标
export function getContTaskQueryAllPointOfCont (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contTask/queryAllPointOfCont', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 详细版保存指标
export function getReportTaskAddCheckProgramme (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/reportTask/addCheckProgramme', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 主任务周期信息确认
export function getMainTaskConfirmCycle (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/mainTask/confirmCycle', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 仪器租赁任务,单个查询接口
export function getLeaseTaskQueryTaskById (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/LeaseTask/queryTaskById', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 方案报错处理
export function getChangeContCaseError (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/changeCont/caseError', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 方案报错处理-新收样任务
export function getChangeContCaseErrorSy (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/changeCont/caseErrorSy', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 修改点位编号
export function getContTaskChangePointNo (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/contTask/changePointNo', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
