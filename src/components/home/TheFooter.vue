<template>
  <v-footer
    dark
    padless
  >
    <v-row>
       <v-card
        flat
        tile
        class="indigo lighten-1 white--text text-center"
      >
        <v-card-text>
          <v-btn
            v-for="[icon, url] in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
            :href="url"
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          <v-row>
            <v-col cols="12" sm="6">
              Este sitio ofrecerá servicios de capacitación a las empresas para sus procesos de inducción aplicando realidad virtual y aumentada. Las aplicaciones de la realidad virtual/aumentada en la industria son múltiples, y las principales firmas tecnológicas como Google, Samsung, Microsoft, Sony, HTC y Facebook han apostado fuerte por su tecnología sabedoras de su aplicación al terreno de los particulares y, sobre todo, a sus posibilidades en el terreno profesional y empresarial.
            </v-col>
            <v-col cols="12" sm="6">
              <h2>Contacto</h2>
              <p><i>virtual-creative@mintic.com</i></p>
              <p><strong>Whatsapp: </strong>3107652123</p>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          &copy; {{ new Date().getFullYear() }} - MinTIC - Universidad Tecnológica de Pereira - <strong>Grupo 107</strong>
        </v-card-text>
      </v-card>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      ['mdi-facebook', 'https://www.facebook.com/MinisterioTIC.Colombia'],
      ['mdi-twitter', 'https://twitter.com/MinTIC_responde'],
      ['mdi-github', 'https://github.com/MinTIC-Group-107/semana-4-107-frontend'],
      ['mdi-instagram', 'https://www.instagram.com/ministerio_tic/?hl=es-la'],
    ],
  }),
}
</script>
