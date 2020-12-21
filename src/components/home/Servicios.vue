
<template>
  <v-carousel
    cycle
    height="500'"
    
    hide-delimiter-background
    show-arrows-on-hover

  >
    <v-carousel-item
      v-for="articulo in articulos"
      :key="articulo.id"
      
    >
      <v-sheet
        color='deep-orange accent-1'
        height="100%"
        width="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
          
        >
            <v-card
            light
            :loading="loading"
            class="mx-auto my-12"
            max-width="70%" 
            >

                <template slot="progress">
                <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                ></v-progress-linear>
                </template>

                <v-img
                heigth="250"
                width="400"
                :src="articulo.imagen"
                ></v-img>

                <v-card-title v-text="articulo.nombre"></v-card-title>

                <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">
                    4.5 (413)
                    </div>
                </v-row>

                <div class="my-4 subtitle-1" v-text="articulo.codigo">
                    $ • Italian, Cafe
                </div>

                <div v-text="articulo.descripcion"></div>
                </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-title>Tonight's availability</v-card-title>

                <v-card-text>
                <v-chip-group
                    v-model="selection"
                    active-class="deep-purple accent-4 white--text"
                    column
                >
                    <v-chip>5:30PM</v-chip>

                    <v-chip>7:30PM</v-chip>

                    <v-chip>8:00PM</v-chip>

                    <v-chip>9:00PM</v-chip>
                </v-chip-group>
                </v-card-text>

                <v-card-actions>
                <v-btn
                    color="deep-purple lighten-2"
                    text
                    v-text="articulo.Categorium.nombre"
                >
                    Reserve
                </v-btn>
                </v-card-actions>
            </v-card>


        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>



<script>
  export default {
    data: () => ({
      loading: true,
      selection: 1,
      articulos: [],
    }),
    methods: {
      getArticles() {
          this.$http.get('/api/articulo/list')
          .then(res => {
              this.articulos = res.data
              console.log(res.data)
              this.loading = false
          })
          .catch(err => {
              console.log(err)
          })
      }
    },
    created() {
        this.getArticles()
    }
  }
</script>