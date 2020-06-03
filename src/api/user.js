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
      url: `/user/retrievePassword`,
      method: 'post',
      data: Qs.stringify(form)
    })
  }

  // 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

//头像上传
export function avatarUpload(data){
  return request({
    url:`/avatar/upload`,
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    data:data
  });
}


  //获取当前登陆用户
  export function getCurrUser(){
    return request({
      url: `/user/currUser`,
      method: 'get'
    })
  }

  // 修改用户
export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'post',
    data: data
  })
}


// 获取用户详细信息
export function getInfo(userId) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      userId
    }
  })
}
