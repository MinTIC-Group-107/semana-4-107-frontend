import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'
const axios = require('axios')

Vue.config.productionTip = false

// url to connect to the backend
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.prototype.$permisos = {
  // estos nombres deben conincidir con el nombre de la vista
  Categorias: [
    'Almacenero',
    'Administrador',
  ],
  Articulos: [
    'Almacenero',
    'Administrador',
  ],
  Usuarios: [
    'Administrador',
  ],
  Administracion: [
    'Administrador',
    'Almacenero',
    'Vendedor',
    'Usuario',
  ],
}

const app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

