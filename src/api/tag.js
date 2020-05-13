import request from '@/request'

export function getAllTags() {
  return request({
    url: '/tags/list',
    method: 'get',
  })
}

export function getHotTags() {
  return request({
    url: '/tags/hot',
    method: 'get',
  })
}

export function getAllTagsDetail() {
  return request({
    url: '/tags/detail',
    method: 'get',
  })
}

export function getTagDetail(id) {
  return request({
    // url: `/tags/detail/${id}`,
    url: '/tags/detail/info',
    method: 'get',
    params: {
      id: id
    }
  })
}



