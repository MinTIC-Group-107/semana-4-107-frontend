<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Group Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/logo.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        :to="{ name: 'Home' }"
        text
        class="mr-2"
        exact
      >
        <span class="mr-2">Inicio</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn
        :to="{ name: 'About' }"
        text
        class="mr-2"
        exact
      >
        <span class="mr-2">About</span>
        <v-icon>info</v-icon>
      </v-btn>
      <v-btn
        :to="{ name: 'Login' }"
        text
        exact
      >
        <span class="mr-2">Login</span>
        <v-icon>login</v-icon>
      </v-btn>
      <v-btn
        :to="{ name: 'Autenticado' }"
        text
        exact
      >
        <span class="mr-2">Autenticado</span>
        <v-icon>mdi-key</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
