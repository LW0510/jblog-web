import request from '@/request'

export function getAllCategorys() {
  return request({
    url: '/category/list',
    method: 'get',
  })
}

export function getAllCategorysDetail() {
  return request({
    url: '/category/detail',
    method: 'get',
  })
}

export function getCategoryDetail(id) {
  return request({
    // url: `/category/detail/${id}`,
    url: '/category/detail/info',
    method: 'get',
    params:{
      id: id
    }
  })
}

 /*
  * 暂时未用到
  */
export function getCategory(id) {
  return request({
    // url: `/category/${id}`,
    url: '/category',
    method: 'get',
    params: {
      id: id
    }
  })
}
