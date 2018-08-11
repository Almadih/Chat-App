<template>
 <v-container fluid style="min-height: 0;" grid-list-lg>
     <h2>Users List</h2>
     <!--<v-card>
     
      <v-flex xs12 lg6 md6 v-for="user in users" :key="user.id" pl-2>
          {{user.name}}
      <v-btn icon  v-bind:to="{name:'chat',params:{to:user.id}}" color="primary">
          <v-icon>message</v-icon>
          </v-btn>
          <v-divider></v-divider>
     </v-flex>
         </v-card>-->
     <v-card>
      <v-card-text>
          
        <v-container>
             <v-list>
                
         <v-list-tile v-for="user in users" :key="user.id">
             
         <v-list-tile-content>
             <v-list-tile-title>
             {{user.name}}
                  
             </v-list-tile-title>
             </v-list-tile-content>
             
             <v-list-tile-action>
             <v-btn icon  v-bind:to="{name:'chat',params:{to:user.id}}" color="primary">
          <v-icon>chat_bubble</v-icon>
          </v-btn>
             </v-list-tile-action>
             
         </v-list-tile>
    
     </v-list>
          </v-container>
         </v-card-text>
     </v-card>
    
     
    </v-container>
</template>

<script>
    import api from './api'
export default{
    data(){
        return{
            users:[],
            id:''
        }
    },
    created(){
        this.id = JSON.parse(localStorage.user).id.toString();
      api.getUsers().then(data => {
          data.forEach((user)=>{
             if(user.id != this.id){
                 this.users.push(user);
             } 
          });
      });
    }
    
}
</script>