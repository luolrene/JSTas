import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: sessionStorage.getItem('userInfo'),
    constumerRouter: false,
    orgId: sessionStorage.getItem('orgId'),
    taskTips: 0,
    currentCustomer: null
  },
  getters: {
    userInfo(state) {
      if (state.userInfo) {
        return JSON.parse(state.userInfo)
      } else {
        return null
      }
    },
    constumerRouter(state) {
      return state.constumerRouter
    },
    taskTips(state) {
      return state.taskTips
    }
  },
  mutations: {
    // 变量赋值，同步 不建议外部使用
    SET_UserInfo(state, userinfo) {
      state.userInfo = JSON.stringify(userinfo)
      if (userinfo) {
        sessionStorage.setItem('userInfo', JSON.stringify(userinfo))
      } else {
        sessionStorage.removeItem('userInfo')
      }
    },
    SET_ConstumerRouter(state, constumerRouter) {
      state.constumerRouter = constumerRouter
    },
    SET_TaskTips(state, taskTips) {
      state.taskTips = taskTips
    },
    changeCurrentCustomer(state, customer) {
      console.log('customer', customer)
      state.currentCustomer = customer
    },
    changeCurrentContacts(state, contacts) {
      console.log('contacts', contacts)
      state.currentContacts = contacts
    }
  },
  actions: {
    // 变量赋值，异步 外部使用的赋值方法
    setUserInfo({ commit }, userinfo) {
      commit('SET_UserInfo', userinfo)
    },
    setConstumerRouter({ commit }, constumerRouter) {
      commit('SET_ConstumerRouter', constumerRouter)
    },
    setTaskTips({ commit }, taskTips) {
      commit('SET_TaskTips', taskTips)
    }
  }
})
export default store
