<template>

  <div>
    <Registro />
  </div>

</template>

<script>
// @ is an alias to /src
import Registro from '@/components/auth/ElRegistro.vue'

export default {
  name: 'signup',
  components: {
    Registro
  }
}
</script>