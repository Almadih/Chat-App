<template>
<v-container>
<v-layout row>
  <v-flex xs12 sm6 offset-sm3 >
    <h1>SignUP</h1>
    <v-card>
      <v-card-text>
        <v-container>
            <v-alert :value="error" type="error">
          {{errormsg}}
             </v-alert>
            <v-alert :value="done" type="success">
      Success! you will be redirected to login page
    </v-alert>
          <form @submit.prevent="singup">
           <v-layout row>
            <v-flex xs12 >
              <v-text-field label="Email" v-model="email" required autofocus></v-text-field>
            </v-flex>
           </v-layout>
              <v-layout row>
            <v-flex xs12 >
              <v-text-field label="Full Name" v-model="name" required></v-text-field>
            </v-flex>
           </v-layout>
           <v-layout row>
             <v-flex xs12 >
              <v-text-field label="Password" type="password"  v-model="password" required></v-text-field>
            </v-flex>    
           </v-layout>
              <v-layout row>
             <v-flex xs12 >
              <v-text-field label="Confirm Password" type="password" :rules="[pas]" v-model="cpassword" required></v-text-field>
            </v-flex>    
           </v-layout>
            <v-layout row>
             <v-flex xs12 >
              <v-btn color="primary" type="submit" :disabled="!valid">signup</v-btn>
                 
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
                cpassword: '',
                name:'',
                error:false,
                errormsg:'',
                done:false

            }
        },
        computed: {
            pas() {
                return this.password !== this.cpassword ? 'Password doesn\'t match' : ''
            },

            valid() {
                return this.pass && this.email !== '' && this.emp
            },

            pass() {
                return this.password == this.cpassword
            },
            emp() {
                return this.password !== '' && this.cpassword !== ''
            }
        },
        methods: {
            singup() {
                let user = {
                    email: this.email,
                    pass: this.password,
                    name:this.name
                };
               
                api.signup(user).then(data => {
                    if(data.error){
                        this.errormsg = data.errormsg;
                      this.error = true;   
                    }else{
                        this.done = true;
                        setTimeout(()=>{
                            this.$router.push('/login');
                        },2400);
                    }
                });
            }
        }
    }

</script>
