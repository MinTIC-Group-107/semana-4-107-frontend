<template>
  <v-data-table
    :headers="headers"
    :items="articulos"
    sort-by="nombre"
    class="elevation-1"
    :loading="cargando"
    loading-text="Cargando... Por favor espere"
  >
  
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{ tableName }}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Agregar artículo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                   
                  >
                    <v-text-field
                      v-model="editedItem.codigo"
                      label="Código"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.descripcion"
                      label="Descripcion"
                    ></v-text-field>
                  </v-col>
                  <!-- Campo para url de imagen -->
                  <v-col
                    cols="12"
                  >
                    <v-text-field
                      v-model="editedItem.imagen"
                      label="URL de imagen"
                    ></v-text-field>
                  </v-col>
                  <!-- Fin Campo para url de imagen -->
                  <v-col
                    cols="12"
                   
                  >
                    <v-select
                    :items="categorias"
                    item-text="nombre"
                    item-value="id"
                    label="Categoría"
                    v-model="editedItem.categoria"
                    ></v-select>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Estas seguro de querer modificar el estado?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        medium
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <!-- Inicio boton cambiar estado -->
      <v-icon
        
        @click="deleteItem(item)"
        v-if="item.estado === 1"
        large
      >
        mdi-toggle-switch
      </v-icon>
      <v-icon
        
        @click="deleteItem(item)"
        v-else
        large
      >
        mdi-toggle-switch-off-outline
      </v-icon>
      <!-- Fin boton cambiar estado -->
    </template>
    <template v-slot:no-data>
      
    </template>
    
  </v-data-table>
</template>

<script>

  export default {
      props: ['tableName'],
    data: () => ({
      dialog: false,
      dialogDelete: false,
      cargando: true,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Código', value: 'codigo' },
        {
          text: 'Artículos',
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Estado', value: 'estado' },
        { text: 'Categoría', value: 'Categorium.nombre' },
        { text: 'Imagen', value: 'imagen' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        codigo: '',
        nombre: '',
        descripcion: '',
        estado: 1,
        categoria: '',
        imagen: '',
      },
      defaultItem: {
        codigo: '',
        nombre: '',
        descripcion: '',
        estado: 1,
        categoria: '',
        imagen: '',
      },
      categorias: [],
      articulos: [],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo artículo' : 'Editar artículo'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.list()
      this.listCategories()
    },

    methods: {
      list() {
        this.$http.get('/api/articulo/list', {
          headers: {
            token: this.$store.state.token,
          }
        })
          .then(response => {
            this.articulos = response.data
            this.articulos.categoria = response.data.Categorium
            this.cargando = false
            })
          .catch(err => {
            console.log('hay un error', err)
          })
          
      },

      listCategories() {
        this.$http.get('/api/categoria/list', {
          headers: {
            token: this.$store.state.token,
          }
        })
          .then(response => {
            const categorias = response.data
            const categoriasActivas = categorias.filter(categoria => categoria.estado === 1)
            this.categorias = categoriasActivas
            })
          .catch(err => {
            console.log(err)
          })
      },

      editItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.editedItem.categoria =  item.Categorium
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        if (this.editedItem.estado === 1) {
          this.$http.put('/api/articulo/deactivate', {
            id: this.editedItem.id
          }, {
            headers: {
            token: this.$store.state.token,
          }
          }).then(() => {
            this.list()
          })
          .catch((err) => {
            console.log(err)
          })
          this.closeDelete()
        } else {
          this.$http.put('/api/articulo/activate', {
            id: this.editedItem.id
          }, {
            headers: {
            token: this.$store.state.token,
          }
          }).then(() => {
            this.list()
          })
          .catch((err) => {
            console.log(err)
          })
          this.closeDelete()
        }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex>-1) {
          this.editedItem.categoriaId = this.editedItem.categoria.id
          console.log('objeto enviado', this.editedItem)
          this.$http.put('/api/articulo/update', this.editedItem, {
            headers: {
            token: this.$store.state.token,
          }
          })
          .then((response) => {
            this.list()
            this.close()
          })
          .catch(err => {
            console.log(err)
          })
        } else {
          this.editedItem.categoriaId = this.editedItem.categoria
          console.log('objeto enviado', this.editedItem)
          this.$http.post('/api/articulo/add', 
          this.editedItem, {
            headers: {
            token: this.$store.state.token,
          }
          })
            .then(() => {
              this.list()
              this.close()
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
    },
  }
</script>