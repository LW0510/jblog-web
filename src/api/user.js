import Qs from 'qs'
import request from '@/request'


// 发送邮箱认证码
export function sendMailCode(mail) {
    return request({
      url: `/sendMailCode`,
      method: 'get',
      params: {
        mail
      }
    })
  }


// 找回密码
export function retrievePassword(form) {
    return request({
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: `/system/user/retrievePassword`,
      method: 'post',
      data: Qs.stringify(form)
    })
  }


  //获取当前dang
  export function getCurrUser(){
    return request({
      url: `/system/user/currUser`,
      method: 'get'
    })

  }
