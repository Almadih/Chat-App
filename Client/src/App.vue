<template>
     <v-app>
         
<div id="app">
  <v-toolbar dark color="primary" >
       <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon> 
    <v-toolbar-title style="margin-right:26px">Real-Time Chat App</v-toolbar-title>
      
      <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/" v-if="loggedin">Home</v-btn>
    <v-btn flat to="/chats" v-if="loggedin">Chats</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <h4 v-if="loggedin" class="mr-4">{{email}}</h4>
        <v-toolbar-items class="hidden-sm-and-down">
            
            <v-btn flat v-if="!loggedin" to="/login">Login</v-btn>
            <v-btn flat v-if="!loggedin" to="/signup">Signup</v-btn>
          <v-btn flat @click="test" v-if="loggedin">Logout</v-btn>
        </v-toolbar-items>
  </v-toolbar>
    
      <!--  <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >

      <v-list class="pt-0" dense >
        <v-divider></v-divider>
        <v-list-tile v-for="m in menu" :key="m.title" link :to="m.link">
          <v-list-tile-action>
              <v-icon>{{m.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content> 
                {{m.title}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>-->
    
    
    
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="n in menu"
          :key="n.title"
         @click="go(n.link)"
                     v-if="n.log"
        >
          <v-list-tile-action>
            <v-icon>{{ n.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ n.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
      <div class="container">
    <router-view/>
      </div>
</div>
    </v-app>
</template>


<script>
export default {
  name: 'App',
     data() {
      return {
          email:'',
          drawer:null,
          menu:[
              {title:'home',icon:'home',link:'/',log:null},
              {title:'Chats',icon:'chat',link:'/chats',log:null},
              {title:'Login',icon:'home',link:'/login',log:null},
              {title:'SingUp',icon:'home',link:'/signup',log:null},
              {title:'Logout',icon:'home',link:'/log',log:null},
          ],
          items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ]
      }
    },
    methods:{
    test(){
     localStorage.user = null;
        this.$router.go({path:this.$route.path});
        this.$router.push('/login')
    },
        go(link){
            if(link === '/log'){
                this.test()
            }else{
        this.$router.push(link);
            }
        }
},
    computed:{
        loggedin(){
            if(localStorage.user){
            return JSON.parse(localStorage.user) !== null;
            }else{
                return false;
            }
        }
    },
    created(){
       if(localStorage.user){
      let user = JSON.parse(localStorage.user); 
           if(user !== null){
            console.log(user);
            this.email = user.email;
            
        }
       }
        
        if(this.loggedin){
         this.menu.forEach((item)=>{
             if(item.title == 'Login' || item.title == 'SingUp'){
                 item.log = false
             }else{
                 item.log = true
             }
         })
        }else{
            
             this.menu.forEach((item)=>{
             if(item.title == 'Login' || item.title == 'SingUp'){
                 item.log = true
             }else{
                 item.log = false
             }
         })
            
        }
        
    }
}
</script>


