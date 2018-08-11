<template>
<v-container>
<v-layout row>
  <v-flex xs12 sm7 offset-sm2>
    <h1>Login</h1>
    <v-card>
      <v-card-text>
        <v-container>
                        <v-alert :value="error" type="error">
          {{errormsg}}
             </v-alert>
          <form @submit.prevent="login">
           <v-layout row>
            <v-flex xs12 >
              <v-text-field label="Email" v-model="email" required autofocus></v-text-field>
            </v-flex>
           </v-layout>
           <v-layout row>
             <v-flex xs12 >
              <v-text-field label="Password" type="password" v-model="password" required></v-text-field>
            </v-flex>    
           </v-layout>
            <v-layout row>
             <v-flex xs12 >
              <v-btn color="primary" type="submit">Login</v-btn>
                 
            </v-flex>    
           </v-layout>
              
          </form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>
</v-container>
</template>

<script>
    import api from './api'
    export default {
        data() {
            return {
                email: '',
                password: '',
                error: false,
                errormsg: ''
            }
        },
        methods: {
            login() {
                let user = {
                    email: this.email,
                    password: this.password
                };

                api.login(user).then(data => {

                    if (data.error) {
                        
                        this.error = true;
                        this.errormsg = data.errormsg;
                    }else{
                        localStorage.user = JSON.stringify(data.user[0]);
                        this.error = false;
                        this.$router.go({path:this.$route.path});
                        this.$router.push('/')
                    }

                });
            }
        },
        created(){
            console.log(this.$route.path+'/login');
        }

    }

</script>
