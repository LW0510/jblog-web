import request from '@/request'

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

export function login(username, password,code,uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    data
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
    // url: '/user/current',
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

