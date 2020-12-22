<template>
  <div>
    <!-- <h2>Casos de éxito</h2> -->
    <v-container>
      <v-row>
        <v-col
          v-for="caso in casos"
          :key="caso.id"
          cols="12"
          sm="3"
        >
          <caso-exito
            :caso="caso"
          >
          </caso-exito>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CasoExito from '../../components/home/CasoExito.vue'
import casos from '../../casos'

export default {
  name: 'CasosExito',
  data() {
    return {
      casos: []
    }
  },
  created() {
    this.casos = casos
  },
  components: {
    CasoExito
  }
}
</script>
