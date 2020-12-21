<template>
  <v-card
    class="mx-auto my-12"
    max-width="500"
  >
  <v-card-text>
    <v-form
      ref="form"
    >
      <v-text-field
        v-model="form.email"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.password"
        type="password"
        label="Contraseña"
        required
      ></v-text-field>

      <v-btn
        :disabled="!(this.form.email && this.form.password)"
        color="success"
        class="mr-4"
        @click="login"
      >
        Enviar
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Limpiar
      </v-btn>
    </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import Swal from 'sweetalert2'
// import VueJwtDecode from 'vue-jwt-decode'

export default {
  data: () => ({
    form: {
      email: 'prueba@gmail.com',
      password: 'micontraseña'
    },
  }),
  beforeCreated() {
    this.$store.dispatch('autoLogin') ? this.$router.push({ name: 'Autenticado' }) : false
  },
  methods: {
    reset () {
      this.form = {}
    },
    async login() {
      try {
        let response = await this.$http.post('/usuario/login', this.form)
        console.log(response.data)
        let token = response.data.tokenReturn
        this.$store.dispatch('guardarToken', token)

        Swal.fire({
          icon: 'success',
          // title: 'Bienvenid@ ' + this.getFirstWord(user.name),
          title: 'Bienvenid@',
          text: 'Te has autenticado correctamente',
        })
        this.$router.push({ name: 'Autenticado' })
      } catch (e) {
        console.log(e)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.response.data.message
        })
      }
    }
  },
}
</script>
