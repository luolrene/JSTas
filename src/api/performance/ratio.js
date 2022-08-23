import axios from '@/utils/axios'

/* 分页查询 */
export function getCrmProportionQueryPageData (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmProportion/queryPageData', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 新建修改 */
export function getCrmProportionAddOrModify (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmProportion/addOrModify', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

/* 删除 */
export function getCrmProportionDelByIds (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmProportion/delByIds', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
/* 获取所有一级部门分组 */
export function getCrmProportionQueryAllGroupsTree (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/CrmProportion/queryAllGroupsTree', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
