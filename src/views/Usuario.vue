<template>
<v-col cols='12'>
  <div>
    <UsuarioTable tableName="Usuarios"/>
  </div>
</v-col>

</template>

<script>
// @ is an alias to /src
import UsuarioTable from '@/components/UsuarioTable.vue'

export default {
  name: 'Usuarios',
  components: {
    UsuarioTable
  }
}
</script>