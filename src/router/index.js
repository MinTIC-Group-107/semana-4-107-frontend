import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      public: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/autenticado',
    name: 'Autenticado',
    component: () => import(/* webpackChunkName: "autenticado" */ '../views/Autenticado.vue'),
    meta: {
      auth: true
    },
    children: [
      {
        path: 'categoria',
        name: 'Categoria',
        component: () => import(/* webpackChunkName: "categoria" */ '../views/Categoria.vue'),
        meta: {
          auth: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.public)) {
    next()
  } else if(to.matched.some(record => record.meta.auth)) {
    // if(store.state.user && store.state.user.rol === 'Administrador) //??
    if(store.state.user) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
