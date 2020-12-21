import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode'
import router from '../router'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    token: null,
    user: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUsuario(state, usuario) {
      state.user = usuario
    }
  },
  actions: {
    guardarToken({commit}, token) {
      commit("setToken", token)
      commit("setUsuario", jwtDecode(token))
      localStorage.setItem('jwt', token)
    },
    autoLogin({commit}) {
      const token = localStorage.getItem('jwt')
      if (token) {
        commit("setToken", token)
        commit("setUsuario", jwtDecode(token))
        return true
      } else {
        return false
      }
    },
    salir({commit}) {
      commit("setToken", null)
      commit("setUsuario", null)
      localStorage.removeItem('jwt')
      router.push({name: 'Login'})
    }
  },
  modules: {
  }
})

export default store
