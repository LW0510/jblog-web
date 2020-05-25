'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"production"',
  API_ROOT: '"http://tomcat_blog_api:8080/jblog-api"', // 后台测试接口地址
  ENV_CONFIG: '"test"'  //这个是区分打包后环境的
})