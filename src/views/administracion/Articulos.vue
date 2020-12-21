<template>
<v-col cols='12'>
  <div>
    <CRUDTable tableName="Artículos"/>
  </div>
</v-col>
</template>

<script>
// @ is an alias to /src
import CRUDTable from '@/components/administracion/ArticuloTable.vue'

export default {
  name: 'Articulos',
  components: {
    CRUDTable
  }
}
</script>