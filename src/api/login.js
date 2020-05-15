import request from '@/request'
import Qs  from "qs";

export function register(username, nickname, password) {
  const data = {
    username,
    nickname,
    password
  }
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function login(loginInfo) {
  return request({
    url: '/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: Qs.stringify(loginInfo)
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

export function getUserInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}



// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}

