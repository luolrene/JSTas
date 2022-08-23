/* 数字验证 */
export function validateNumber(rule, value, callback) {
  let numberReg = /^\d+$|^\d+[.]?\d+$/
  if (value !== '') {
    if (!numberReg.test(value)) {
      callback(new Error('请输入数字'))
    } else {
      callback()
    }
  } else {
    // callback(new Error('请输入值'))
    callback()
  }
  // ^[1-9]\d*$ //匹配正整数
  // ^-[1-9]\d*$ //匹配负整数
  // ^-?[1-9]\d*$ //匹配整数
  // ^[1-9]\d*|0$ //匹配非负整数（正整数 + 0）
  // ^-[1-9]\d*|0$ //匹配非正整数（负整数 + 0）
  // ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$ //匹配正浮点数
  // ^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$ //匹配负浮点数
  // ^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$ //匹配浮点数
  // ^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$ //匹配非负浮点数（正浮点数 + 0）
  // ^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$ //匹配非正浮点数（负浮点数 + 0）
}
// 随机数
export function randomID(num) {
  let time = new Date().getTime()
  let length = (time + '').length
  if (length < num) {
    for (let i = 0; i < num - length - 1; i++) {
      let num = Math.floor(Math.random() * 10)
      time = time + '' + num
    }
  }
  return time
}
// 手机号码校验
export function validatePhoneTwo(rule, value, callback) {
  const reg = /^1[123456789]\d{9}$/;
  if (value === '' || value === undefined || value === null) {
    callback();
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的电话号码或者固话号码'));
    } else {
      callback();
    }
  }
}

// 0-100 保留2位小数
export function validateTwo(rule, value, callback) {
  const reg = /^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/;
  if (value === '' || value === undefined || value === null) {
    callback();
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入大于0小于100并且小数点后最多保留2位'));
    } else {
      callback();
    }
  }
}
// 0-1 保留2位小数
export function validateTwoDigit(rule, value, callback) {
  const reg = /^0\.[0-9]{1,2}$|^0{1}$|^1{1}$|^1\.[0]{1,2}$/;
  if (value === '' || value === undefined || value === null) {
    callback();
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入0-1之间的两位小数'));
    } else {
      callback();
    }
  }
}
// 正整数
export function NumberIndex(rule, value, callback) {
  const reg = /^[0-9]*[1-9][0-9]*$/;
  if (value === '' || value === undefined || value === null) {
    callback();
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正整数'));
    } else {
      callback();
    }
  }
}
// 保留2位小数
export function TwoNumber(rule, value, callback) {
  const reg = /(^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$)/;
  if (value === '' || value === undefined || value === null) {
    callback();
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入纯数字且最多保留2位小数'));
    } else {
      callback();
    }
  }
}

// 邮箱手机
export function emailPhone(rule, value, callback) {
  const reg = /^\w+((-\w+)|(\.\w+))*@\w+(\.\w{2,3}){1,3}$/;
  const reg1 = /^1[0-9]{10}$/;
  if (value === '' || value === undefined || value === null) {
    callback();
  } else {
    if ((reg1.test(value)) && value !== '') {
      callback();
    } else if ((reg.test(value)) && value !== '') {
      callback();
    } else {
      callback(new Error('请输入正确的邮箱或手机'));
    }
  }
}

/* 日期格式化 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((`${time}`).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return value || 0
  })
  return timeStr
}
// 保留2位小数
export function keepTwoDecimalFull(num) {
  let result = parseFloat(num)
  if (isNaN(result)) {
    alert('传递参数错误，请检查！')
    return false
  }
  result = Math.round(num * 100) / 100
  let xdd = result.toString() // 将数字转换为字符串

  let posDecimal = xdd.indexOf('.') // 小数点的索引值

  // 当整数时，posDecimal=-1 自动补0
  if (posDecimal < 0) {
    posDecimal = xdd.length
    xdd += '.'
  }

  // 当数字的长度< 小数点索引+2时，补0
  while (xdd.length <= posDecimal + 2) {
    xdd += '0'
  }
  return xdd
}
// children为【】时转为null
export function zzData(data) {
  data.forEach(xdd => {
    if (xdd.children && xdd.children.length === 0) {
      xdd.children = null
    } else {
      zzData(xdd.children)
    }
  })
  return data
}
