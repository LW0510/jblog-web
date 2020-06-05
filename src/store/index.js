import Vuex from 'vuex'
import Vue from 'vue'
import {getToken, setToken, removeToken} from '@/request/auth'
import {login, getUserInfo, logout, register} from '@/api/login'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: '',
    username: '',
    name: '',
    avatar: '',
    token: getToken(),
    addr: '',
    label: '',
    phone:'',
    email:''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ACCOUNT: (state, username) => {
      state.username = username
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_ADDR: (state, addr) => {
      state.addr = addr
    },
    SET_LABEL: (state, label) => {
      state.label = label
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    }
  },
  actions: {
    // 登录
    login({commit}, loginInfo) {
      return new Promise((resolve, reject) => {
        login(loginInfo).then(data => {
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    getUserInfo({commit, state}) {
      let that = this
      return new Promise((resolve, reject) => {
        getUserInfo().then(data => {
          if (data.code === 200 ) {
            commit('SET_ACCOUNT', data.user.userName)
            commit('SET_NAME', data.user.nickName)
            commit('SET_AVATAR',data.user.avatar)
            commit('SET_ID', data.user.userId)
            commit('SET_ADDR', data.user.addr)
            commit('SET_LABEL', data.user.label)
            commit('SET_PHONE', data.user.phonenumber)
            commit('SET_EMAIL', data.user.email)
          } else {
            commit('SET_ACCOUNT', '')
            commit('SET_NAME', '')
            commit('SET_AVATAR', '')
            commit('SET_ID', '')
            commit('SET_ADDR', '')
            commit('SET_LABEL', '')
            commit('SET_PHONE', '')
            commit('SET_EMAIL', '')
            //用户信息不存在，删除token
            removeToken()
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出
    logout({commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then(data => {
          commit('SET_TOKEN', '')
          commit('SET_ACCOUNT', '')
          commit('SET_NAME', '')
          commit('SET_AVATAR', '')
          commit('SET_ID', '')
          commit('SET_ADDR', '')
          commit('SET_LABEL', '')
          commit('SET_PHONE', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    fedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ACCOUNT', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_ID', '')
        commit('SET_ADDR', '')
        commit('SET_LABEL', '')
        commit('SET_PHONE', '')
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    },

    // 注册
    register({commit}, user) {
      return new Promise((resolve, reject) => {
        register(user).then((data) => {
          // commit('SET_TOKEN', data.data['Oauth-Token'])
          // setToken(data.data['Oauth-Token'])
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
})
