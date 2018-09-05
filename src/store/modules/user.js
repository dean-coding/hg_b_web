import * as types from '../mutation-types'
import Store from '../../utils/storage.js'

const state = {
  login: false,
  user: {
    id: '',
    username: '',
    logoRes: ''
  },
  expireTime: ''
}

const mutations = {
  [types.LOGIN] (state, user) {
    state.login = true
    state.user = user
    state.expireTime = new Date().getTime() + 30 * 60 * 1000
    // 加入储存中
    Store.save('userinfo', user)
  },
  [types.LOGOUT] (state) {
    window.console.log('in user mutations: LOGOUT')
    state.login = false
    state.user = {}
    state.expireTime = ''
    Store.remove('userinfo')
  }
}

// actions
const actions = {
  doLogin ({dispatch, commit}, user) {
    commit(types.LOGIN, user)
    
  },
  doLogout ({commit}) {
    commit(types.LOGOUT)
  }
}

export default {
  state,
  mutations,
  actions
}


