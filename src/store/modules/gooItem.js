import * as types from '../mutation-types'
import Store from '../../utils/storage.js'

const state = {
    isExists:false,
    gooItem: {
      // id: null,
      // serialNumber: null,
      // name: null,
      // cateId: null,
      // cateName: null,
      // sellPoint: [],
      // count: 0,
      // sellPrice: 0.00,
      // originPrice: 0.00,
      // status: null,
      // itemDesc: null,
      // createdDate: null,
      // updatedDate: null
  },
  gooItemSteps:0,
  expireTime:''
}

const mutations = {
  [types.SAVE_GOO_ITEM_INFO] (state, gooItem) {
    window.console.log('in gooItem mutations: SAVE')
    if(state.isExists) {
      Store.remove('goo-item')
    }
    state.isExists = true
    state.gooItem = gooItem
    state.expireTime = new Date().getTime() + 10 * 60 * 1000
    Store.save('goo-item', gooItem)
  },
  [types.REMOVE_GOO_ITEM_INFO] (state) {
    window.console.log('in gooItem mutations: REMOVE')
    state.isExists = false;
    state.gooItem = {},
    state.expireTime = '',
    Store.remove('goo-item')
  }

}

// actions
const actions = {
  doSaveGooItem ({dispatch, commit}, gooItem) {
    commit(types.SAVE_GOO_ITEM_INFO, gooItem)
    // dispatch('connectStomp', gooItem['id'])
  },
  doRemoveGooItem({commit}) {
    commit(types.REMOVE_GOO_ITEM_INFO)
  }
}

export default {
  state,
  mutations,
  actions
}


