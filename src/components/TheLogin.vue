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
                <v-form @submit.prevent="loginUser">
                  
                  <v-text-field v-model="login.email" light="light" prepend-icon="email" label="Email" type="email"></v-text-field>
                  <v-text-field v-model="login.password" light="light" prepend-icon="lock" label="Contraseña" type="password"></v-text-field>
                  
                  <v-btn block="block" type="submit">Ingresar</v-btn>
                  
                </v-form>
              </v-card-text>
            </v-card>
            <div id="irRegistro">No tienes cuenta?
              <v-btn light="light" to="/registro">Registrarse</v-btn>
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
    data: () => ({
        login: {
            email: "",
            password: ""
        }
    }),
    methods: {
        async loginUser() {
            try {
                let response = await this.$http.post("/api/usuario/login", this.login)
                ;
                console.log(response.data);
                let token = response.data.tokenReturn;
                localStorage.setItem("jwt", token);
                if (token) {
                    swal("Exitoso", "login exitoso", "success");
                    this.$router.push("/administracion");
                }
            } catch (err) {
                    swal("Error", "datos incorrectos", "error");
                    console.log(err.response);
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

