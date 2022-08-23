import axios from '@/utils/axios'

// 批量收样
export function getSamplingTaskChargeSampNoList (params) {
  return new Promise((resolve, reject) => {
    axios.post(process.env.JS_Server + '/samplingTask/chargeSampNoList', params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
