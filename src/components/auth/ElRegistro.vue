<template>  
<div>

  <v-app id="pagina">
    <v-content >
      <v-container fill-height="fill-height">
        <v-layout align-center="align-center" justify-center="justify-center" >
          <v-flex class="login-form text-xs-center" id="forma"> 
            <div class="display-1 mb-3">
              <v-icon  x-large>mdi-account-circle</v-icon> Mi Admin Site
            </div>
            <v-card light="light">
              <v-card-text>
                <div class="subheading">
                  Ingresa para administrar la página
                  
                </div>
                <v-form @submit.prevent="signUp">

                  <v-text-field v-model="user.nombre" light="light" prepend-icon="account" label="nombre" type="text"></v-text-field>
                  <v-text-field v-model="user.email" light="light" prepend-icon="email" label="Email" type="email"></v-text-field>
                  <v-text-field v-model="user.password" light="light" prepend-icon="lock" label="Contraseña" type="password"></v-text-field>
                  <v-text-field v-model="password2" light="light" prepend-icon="lock" label="Contraseña" type="password"></v-text-field>
                  
                  <v-btn block="block" type="submit">Registrarse</v-btn>
                  
                </v-form>
              </v-card-text>
            </v-card>
            <div id="irRegistro">Ya tienes cuenta?
              <v-btn light="light" to="/login">Iniciar sesión</v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app="app">
      <v-flex class="text-xs-center">© 2020. All rights reserved.</v-flex>
    </v-footer>
  </v-app>
 

</div>
</template>

<script>
import swal from "sweetalert";

export default {
    data() {
            return {
                user: {
                    nombre: "",
                    email: "",
                    password: ""
                },
                password2: ""
            };
        },
        methods: {
            async signUp() {
    
                    if (this.user.password === this.password2) {
                        const response = await this.$http.post("/api/usuario/add", this.user)
                        console.log('result of axios',response)
                        if (response.data.message === "Registro Exitoso") {
                            swal("Bravo!", "El registro ha sido exitoso", "success")
                            return this.$router.push('/login')
                        } else {
                            return swal("Error", "Algo salió mal", "error")
                        }
                        
                    } else {
                        return swal("Error", "Las contraseñas no coinciden", "error")
                    }
               
            }
        }
}
</script>

<style>
    .login-form {
        max-width: 500px
    }

    #pagina {
        background: #0063ba;
    }
    #forma {
        background: rgba(240,240,240,0.4);
        padding: 4em;
        border-radius: 20px;
        box-shadow: 2px 2px 18px 41px rgba(0,0,0,0.2);
    }
    #irRegistro {
        margin: 1em;
    }
</style>