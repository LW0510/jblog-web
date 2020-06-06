import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'

/*import Index from '@/views/Index'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Log from '@/views/Log'
import MessageBoard from '@/views/MessageBoard'
import BlogWrite from '@/views/blog/BlogWrite'
import BlogView from '@/views/blog/BlogView'
import BlogAllCategoryTag from '@/views/blog/BlogAllCategoryTag'
import BlogCategoryTag from '@/views/blog/BlogCategoryTag'*/

import {
  Message
} from 'element-ui';
import {
  getToken
} from '@/request/auth'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [{
      name: 'write',
      path: '/write/:id?',
      component: r => require.ensure([], () => r(require('@/views/blog/BlogWrite')), 'blogwrite'),
      meta: {
        requireLogin: true
      },
    },
    {
      path: '',
      name: 'home',
      component: Home,
      children: [{
          name: '',
          path: '/',
          component: r => require.ensure([], () => r(require('@/views/Index')), 'index')
        },
        {
          name: 'log',
          path: '/log',
          component: r => require.ensure([], () => r(require('@/views/Log')), 'log'),
          meta: {
            requireLogin: true
          },
        },
        {
          name: 'archives',
          path: '/archives/:year?/:month?',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogArchive')), 'archives'),
          meta: {
            requireLogin: true
          },
        },
        {
          name: 'feedback',
          path: '/feedback',
          component: r => require.ensure([], () => r(require('@/views/MessageBoard')), 'messageboard'),
          meta: {
            requireLogin: true
          },
        },
        {
          name: 'view',
          path: '/view/:id',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogView')), 'blogview')
        },
        {
          path: '/:type/all',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogAllCategoryTag')), 'blogallcategorytag')
        },
        {
          path: '/:type/:id',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogCategoryTag')), 'blogcategorytag')
        },
        {
          name: 'myhome',
          path: '/myhome',
          component: r => require.ensure([], () => r(require('@/views/user/MyHome')), 'myhome')
        }, {
          name: 'profile',
          path: '/profile',
          component: r => require.ensure([], () => r(require('@/views/user/profile')), 'profile')
        }
      ]
    },
    {
      path: '/login',
      component: r => require.ensure([], () => r(require('@/views/Login')), 'login')
    },
    {
      path: '/register',
      component: r => require.ensure([], () => r(require('@/views/Register')), 'register')
    }, {
      path: '/forgetpwd',
      component: r => require.ensure([], () => r(require('@/views/user/ForgetPwd')), 'forgetpwd')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})



router.beforeEach((to, from, next) => {

  if (getToken()) { // 有token
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      // if (store.state.username.length === 0) {
      //   store.dispatch('getUserInfo').then(data => { //获取用户信息
      //     next()
      //   }).catch(() => {
      //     // next({path: '/'})
      //     Message({
      //       type: 'warning',
      //       showClose: true,
      //       message: '获取用户信息失败'
      //     })
      //   })
      // } else {
      next()
      // }
    }
  } else { // 无token
    if (to.matched.some(r => r.meta.requireLogin)) {
      Message({
        type: 'warning',
        showClose: true,
        message: '请先登录哦'
      })

      //回到之前路由地址
      next({
        path: from.path
      });

    } else {

      next();
    }
  }
})

  


export default router
