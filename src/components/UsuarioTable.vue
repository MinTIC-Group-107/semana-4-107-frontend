<template>
  <v-data-table
    :headers="headers"
    :items="usuarios"
    sort-by="calories"
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
            <!-- <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Agregar usuario
            </v-btn> -->
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
                      v-model="editedItem.nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                   
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                   
                  >
                    <v-text-field
                      v-model="editedItem.rol"
                      label="Rol"
                    ></v-text-field>
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
      cargando: true,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'ID', value: 'id' },
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'nombre',
        },
        { text: 'Email', value: 'email' },
        { text: 'Permisos', value: 'rol' },
        { text: 'Estado', value: 'estado' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        nombre: '',
        email: '',
        rol: '',
        estado: 1,
      },
      defaultItem: {
        id: 0,
        nombre: '',
        email: '',
        rol: '',
        estado: 1,
      },
      usuarios: []
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva usuario' : 'Editar usuario'
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
    },

    methods: {
      list() {
        this.$http.get('/api/usuario/', {
          headers: {
            token: this.$store.state.token,
          }
        })
          .then(response => {
            this.usuarios = response.data
            this.cargando = false
            })
          .catch(err => {
            console.log(err)
          })
      },

      editItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        if (this.editedItem.estado === 1) {
          this.$http.put('/api/usuario/deactivate', {
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
          this.$http.put('/api/usuario/activate', {
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
          const newUser = this.editedItem
          delete newUser.estado
          this.$http.put('/api/usuario/update', newUser, {
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
          this.$http.post('/api/usuario/add', 
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