import request from '@/request'
import Qs  from "qs";

export function articleList(query, page) {
  return request({
    url: '/article/list',
    method: 'get',
    params: {
      userId: query.userId,
      pageNum: page.pageNo,
      pageSize: page.pageSize,
      orderField: page.name,
      order: page.sort,
      year: query.year,
      month: query.month,
      tagId: query.tagId,
      title: query.title,
      categoryId: query.categoryId,
      status: query.status
    }
  })
}

export function getHotArtices() {
  return request({
    url: '/article/hot',
    method: 'get'
  })
}

export function getNewArtices() {
  return request({
    url: '/article/new',
    method: 'get'
  })
}

export function viewArticle(id) {
  return request({
    url: `/article/view`,
    method: 'get',
    params: {
      id
    }
  })
}

export function getArticleById(id) {
  return request({
    // url: `/article/${id}`,
    url: `/article/getArticle`,
    method: 'get',
    params: {
      id
    }
  })
}

export function publishArticle(article) {
  return request({
    url: '/article/publish',
    method: 'post',
    data: article
  })
}

export function listArchives() {
  return request({
    url: '/article/archives',
    method: 'get'
  })
}

export function deleteArticle(id) {
  let data = {id:id}
  return request({
    url: '/article/deleteArticle',
    method: 'post',
    data: Qs.stringify(data)
  })
}




/*
 * 以下俩接口暂时未用到
 * 可通过/article/list接口实现
 */
export function getArticlesByCategory(id) {
  return request({
    url: `/article/category/${id}`,
    method: 'get'
  })
}

export function getArticlesByTag(id) {
  return request({
    url: `/article/tag/${id}`,
    method: 'get'
  })
}





