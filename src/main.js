import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
const axios = require('axios')

Vue.config.productionTip = false

// url to connect to the backend
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
})

const app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

