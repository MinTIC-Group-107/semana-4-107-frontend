<template>
  <v-app id="app">

    <!-- Lista de navegación -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    > 
  
      <v-list>
      <template>
        <!-- Botón de home -->
        <v-list-item to="/">
          <v-list-item-action>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
          </v-list-item-action>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </template>

      <!-- Grupo Cuenta -->
      <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Cuenta</v-list-item-title>
        </template>

        <!-- Grupo Admnin -->
        <!-- <v-list-group
          :value="true"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>

            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group> -->
        <!-- Fin grupo Admin -->

        <!-- Grupo Usuarios -->
        <v-list-group
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Usuarios</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            to="/usuarios"
            links
            v-if="$permisos.Usuarios.indexOf($store.state.user.rol) > -1"
          >
            <v-list-item-title >Permisos</v-list-item-title>

            <v-list-item-icon>
              <v-icon>mdi-account-multiple-outline</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        
      </v-list-group>
      <!-- Fin grupo Usuarios -->
      <!-- Fin grupo Cuenta -->

      <!-- Botón de categorías -->
      <v-list-item to="/categorias" v-if="$permisos.Categorias.indexOf($store.state.user.rol) > -1">
        <v-list-item-icon>
            <v-icon>mdi-folder-multiple-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Categorías
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- Botón de artículos -->
      <v-list-item to="/articulos" v-if="$permisos.Articulos.indexOf($store.state.user.rol) > -1">
        <v-list-item-icon>
            <v-icon>mdi-shopping</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Artículos
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    </v-navigation-drawer>
    <!-- Fin lista de navegación -->

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-3"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Administración del sitio</span>
      </v-toolbar-title>      
      <v-spacer></v-spacer>
      <v-btn icon @click="salir()">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer height="auto">
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat tile color="primary" class="white--text">
            <v-card-text class="white--text pt-0">
              IncanatoIT &copy;2019
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>


  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    drawer: true,
    admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
  }),
  beforeCreate() {
    this.$store.dispatch('autoLogin')
  },
  methods: {
        logUserOut() {
            localStorage.removeItem('jwt')
            this.$router.push('/login')
        },
        salir() {
          this.$store.dispatch('salir')
        }
  }
};
</script>