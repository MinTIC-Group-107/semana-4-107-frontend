<template>
<v-col cols='12'>
  <div>
    <CRUDTable tableName="Categorías"/>
  </div>
</v-col>

</template>

<script>
// @ is an alias to /src
import CRUDTable from '@/components/CategoriaTable.vue'

export default {
  name: 'Categorias',
  components: {
    CRUDTable
  }
}
</script>