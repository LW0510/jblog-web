import request from '@/request'


export function getCommentsByArticle(id) {
  return request({
    url: `/comments/article/info`,
    method: 'get',
    params: {
      id
    }
  })
}

export function publishComment(comment) {
  return request({
    url: '/comments/create/change',
    method: 'post',
    data: comment
  })
}

