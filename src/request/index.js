import axios from 'axios'
import {Notification,Message,MessageBox} from 'element-ui'
import store from '@/store'
import {getToken} from '@/request/auth'

const service = axios.create({
  // baseURL: process.env.BASE_API,

  //部署到线上时注释
  baseURL: "/",
  timeout: 10000
})

//request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    //全局统一处理 Session超时
    // if (response.headers['session_time_out'] == 'timeout') {
    //   store.dispatch('fedLogOut')
    // }

    const code = response.data.code;

    //200 为成功状态
    if (code !== 200) {

      //90001 Session超时
      // if (res.code === 90001) {
      //   return Promise.reject('error');
      // }

      //401 用户未登录
      if (code === 401) {
        //当前用户已经登录过，token过期了
        if(getToken()){
          MessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            store.dispatch('fedLogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
        }else{
          Message({
            type: 'error',
            showClose: true,
            message: '权限不够哦'
          })
        return Promise.reject('权限不够哦');
        }

      }else if(code !== 200){
        Message({
          type: 'error',
          showClose: true,
          message: response.data.msg
        })
        return Promise.reject(response.data.msg);
      }
    } else {
      return response.data;
    }
  },
  error => {
    Message({
      type: 'warning',
      showClose: true,
      message: '连接超时'
    })
    return Promise.reject('error')
  })

export default service
