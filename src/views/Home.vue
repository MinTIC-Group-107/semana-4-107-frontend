<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <div id="servicios">
      <Servicios />
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Servicios from '@/components/home/Servicios.vue'

export default {
  name: 'Home',
  components: {
    Servicios
  }
}
</script>

<style>
#servicios {
  width: 70%;
  margin: auto;
}
</style>