'use strict'
import {Message, MessageBox} from 'element-ui'

export default {
  confirm (params) {
    let message = '此操作将永久删除该数据, 是否继续?'
    let confirmName = '确定'
    let cancelName = '取消'
    let type = 'warning'
    if (params.message) { message = params.message }
    if (params.confirmName) { confirmName = params.confirmName }
    if (params.cancelName) { cancelName = params.cancelName }
    if (params.type) { type = params.type }
    MessageBox.confirm(message, '提示', {
      confirmButtonText: confirmName,
      cancelButtonText: cancelName,
      dangerouslyUseHTMLString: true,
      type: type
    }).then(() => {
      params.confirm()
    }).catch(() => {

    })
  },
  message (name, type, close) {
    let defaultMessage = '保存成功'
    let defaultType = 'success'
    let defaultClose = false
    if (name) { defaultMessage = name }
    if (type) { defaultType = type }
    if (close) { defaultClose = close }
    Message({
      message: defaultMessage,
      type: defaultType,
      showClose: defaultClose
    })
  }
}
