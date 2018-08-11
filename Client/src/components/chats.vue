<template>
 <v-container fluid style="min-height: 0;" grid-list-lg>
     <h2>Chats</h2>
     <v-card>
      <v-card-text>
          <p v-if="chats.length == 0" >No chats go to home page and send some messages</p>
        <v-container>
             <v-list>
         <v-list-tile v-for="chat in chats" :key="chat.to_id">
             
         <v-list-tile-content v-if="id != chat.to_id">
             <v-list-tile-title>
             {{chat.name}}
             </v-list-tile-title>
             </v-list-tile-content>
             <v-list-tile-action v-if="id != chat.to_id">
             <v-btn icon  v-bind:to="{name:'chat',params:{to:chat.to_id}}" color="primary">
          <v-icon>message</v-icon>
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
            chats:[],
            id:''
        }
    },
    created(){
        this.id = JSON.parse(localStorage.user).id.toString();
        api.getChats(this.id).then(data => {
            data.forEach((user)=>{
                if(user.to_id != this.id){
                    this.chats.push(user);
                }
            })
        });
     
    }
    
}
</script>