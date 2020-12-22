<template>
  <div class="home">

  <!-- Navigation bar -->
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://futuroelectrico.com/wp-content/uploads/2020/08/realidad-virtual.jpg"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <!-- banner -->
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-side-icon>
        <router-link :to="{ name: 'Home' }">
          <v-img max-width="150px" src="@/assets/logo.png" />
        </router-link>
      </v-toolbar-side-icon>

      <v-toolbar-title><i>Calidad a su servicio</i></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item :to="{ name: 'Login' }">
          Iniciar sesión
        </v-list-item>
      </v-list>
      </v-menu>

      <!-- Pestañas de la barra de navegación -->
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab :to="{ name: 'Informacion' }">Información</v-tab>
          <v-tab :to="{ name: 'Servicios' }">Servicios</v-tab>
          <v-tab to="/">Historias de éxito</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="1000px"
    >
    <!-- Contenido de la pagina -->
      <v-container style="height: 1500px; margin-top:20%">

        <router-view name="landing"/>


      </v-container>
      <!-- Fin Contenido de la pagina -->
    </v-sheet>
  </v-card>




  </div>
</template>

<script>
// @ is an alias to /src
import Servicios from '@/components/home/Servicios.vue'
import Navigation from '@/components/home/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Servicios,
    Navigation
  }
}
</script>

<style>
#servicios {
  width: 70%;
  margin: auto;
}
</style>
