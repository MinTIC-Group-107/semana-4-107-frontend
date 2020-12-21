import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import swal from 'sweetalert'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      public: true
    },
  },
  {
    path: '/registro',
    name: 'Registro',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Registro.vue'),
    meta: {
      public: true
    },
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Login.vue'),
    meta: {
      public: true
    },
  },
  {
    path: '/administracion',
    name: 'Administracion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Administracion.vue'),
    meta: {
      auth: true,
      permisos: ['Administrador', 'Almacenero', 'Vendedor', 'Usuario'],
      Administrador : true,
      Vendedor: true,
      Almacenero: true,
      Usuario: true,
    },
    children: [
      {
        path: '/articulos',
        name: 'Articulos',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/administracion/Articulos.vue'),
        meta: {
          auth: true,
          permisos: ['Administrador', 'Almacenero'],
          Administrador : true,
          Almacenero: true,
        },
      },
      {
        path: '/categorias',
        name: 'Categorias',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/administracion/Categorias.vue'),
        meta: {
          auth: true,
          permisos: ['Administrador', 'Almacenero'],
          Administrador : true,
          Almacenero: true,
        },
      },
      {
        path: '/usuarios',
        name: 'Usuarios',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/administracion/Usuario.vue'),
        meta: {
          auth: true,
          permisos: ['Administrador'],
          Administrador : true,
        },
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(ruta => ruta.meta.public)) {
    return next()
  // Revisar si la ruta requiere autenticacion
  } else if (to.matched.some(ruta => ruta.meta.auth)) {
    // Evaluar si el usuario ya esta loggeado
    if (store.state.user) { 
      // Evaluar si el usuario tiene los permisos necesarios
      if (Vue.prototype.$permisos[to.name].indexOf(store.state.user.rol)>-1) {
        return next()
      } else {
        return next(from)
      }
    // si está en el loggin no devolverlo al loggin para que no haya doble direccionamiento
    } else if (from.name !== 'Login') {
      return next({name: 'Login'})
    } 

  } else {
    next()
  }
})

export default router
