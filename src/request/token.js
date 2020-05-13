export function getToken() {
  return window.localStorage.token
}

export function setToken(token) {
  debugger;
  return window.localStorage.token = token
}

export function removeToken() {
  return window.localStorage.removeItem('token')
}