import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import user from './modules/user'
import gooItem from './modules/gooItem'

Vue.use(Vuex)

//开发模式启动调试
const debug = process.env.NODE_ENV !== 'production'
const actions = { auth: { handler: () => {}, logout: () => sinon.stub() } };

export default new Vuex.Store({
  actions,
  modules: {
    user,
    gooItem
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

