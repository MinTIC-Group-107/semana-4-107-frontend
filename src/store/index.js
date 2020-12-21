import Vue from 'vue'
import Vuex from 'vuex'
import VueJwtDecode from 'vue-jwt-decode'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    usuario: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUsuario(state, usuario) {
      state.usuario = usuario
    }
  },
  actions: {
    guardarToken({ commit }, token) {
      commit('setToken', token)
      commit('setUsuario', VueJwtDecode.decode(token))
      localStorage.setItem('jwt', token)
    },
    autoLogin({ commit }) {
      const token = localStorage.getItem('jwt')
      if (token) {
        commit('setToken', token)
        commit('setUsuario', VueJwtDecode.decode(token))
        return true
      } else {
        return false
      }
    },
    salir({ commit }) {
      commit('setToken', null)
      commit('setUsuario', null)
      localStorage.removeItem('jwt')
      router.push({ name: 'Home' })
    }
  },
  modules: {
  }
})
