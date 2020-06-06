import request from '@/request'


export function listRecord(query) {
    return request({
      url: '/record/list',
      method: 'get',
      params: query
    })
  }
  
  export function getRecord(id) {
    return request({
      url: '/record/getRecord',
      method: 'get',
      params:{
          id
      }
    })
  }
  
  export function addRecord(data) {
    return request({
      url: '/record/addRecord',
      method: 'post',
      params: data
    })
  }

  export function updateRecord(data) {
    return request({
      url: '/record/updateRecord',
      method: 'post',
      params: data
    })
  }
  

  export function delRecord(id) {
    return request({
      url: '/record/deleteRecord',
      method: 'post',
      params:{
          id
      }
    })
  }
  