'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  // BASE_API: '"http://192.168.0.140:8081"',
   BASE_API: '"http://192.168.0.254:8080"',  //测试服务器
  // BASE_API: '"http://192.168.0.196:8080"',  //测试服务器
  // BASE_API: '"http://192.168.0.140:8080"',  //测试服务器

 
  // BASE_API: '"http://47.108.227.22:8080"',  //生产环境
  // BASE_API: '"http://192.168.0.140:8080"',
  // BASE_API: '"http://192.168.0.139:8080"',
  JS_Server: '"/JSCheck"',
  FILE_Server: '"http://192.168.0.254:8012/onlinePreview?url="',
  NODE_ENV: '"development"'
})
