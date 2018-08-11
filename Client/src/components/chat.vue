<template>
  <div>
      <!-- <v-card>
      <div class="msgs">
       <div  v-for="msg in msgs" :key="msg.id">
           <v-flex xs12 sm7 offset-sm2 mb-4>
       <v-card>
      <v-card-text>
        <v-container center>
            <h3 v-if="id == msg.from_id" align="right">{{msg.text}}</h3>
            <h3 v-else>{{msg.text}}</h3>
          </v-container>
           </v-card-text>
           </v-card>
           </v-flex>
      </div>
      </div>
     </v-card>-->
      <div >
       <v-layout row  >
          <v-flex sm2 xs3 md2>
             <v-btn icon to="/">
                 <v-icon large>arrow_back</v-icon>
              </v-btn>
             
             </v-flex>
           
          <v-flex sm6 xs12 md4>
              <h1>{{name}}</h1>
             </v-flex>
          </v-layout>
      </div>
     
      <v-layout column mb-5 mt-4 class="pb-4 scroll-y" id="hi" >
        
    <v-flex v-for="message of msgs" v-bind:key="message.id" :style="{ 'align-self': isMine(message.from_id) ? 'flex-end' : 'flex-start' } ">
      <v-card v-if="isMine(message.from_id)" color="primary" class="white--text" style="margin-bottom:3px ; border-radius:30px" flat>
        <v-card-title class="text-xs-right">
          <div>
            <div>{{ message.text }}</div>
          </div>
        </v-card-title>
      </v-card>
      <v-card v-else color="grey lighten-2" style="margin-bottom:3px" flat style="border-radius:30px">
        <v-card-title>
          <div>
            <div>{{ message.text }}</div>
            <div class="grey--text"></div>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
  
     <div class="hi" id="container">
      </div>
          
          
          
    
    <div>
    <v-layout row>
    <div class="fix xs11" >
         <form @submit.prevent="send">
        <v-layout row>
        <v-flex sm11 xs10>
        <v-text-field label="Message" v-model="text" autofocus></v-text-field>
            </v-flex>
            <v-flex sm1 xs1>
        <v-btn type="submit" icon color="primary" large :disabled=ms>
        <v-icon size="xlarge">send</v-icon>
        </v-btn>
        </v-flex>
        </v-layout>
      </form>
        </div>    
    </v-layout>  
    </div>
  </div>
</template>

<script>
    import Pusher from 'pusher-js'
    import api from './api'
    import io from 'socket.io-client'
 let sock = new io('https://almadihapi-chat-api.glitch.me'); 
    export default {
        name: 'App',

        data() {
            return {
                today: new Date(),
                id: '',
                text: '',
                msgs: [

                ],
                name: '',
                sound: 'https://almadihapi-chat-api.glitch.me/sound',
                sent: null
            }
        },

        created() {
            this.id = JSON.parse(localStorage.user).id.toString();
            this.fetch();
            api.getUser(this.$route.params.to).then(data => this.name = data);
            this.sc();
            sock.on('msg', (data)=>{
               if (!this.sent && data.to_id == this.id && data.from_id == this.$route.params.to) {
                    this.msgs.push(data);
                    this.playSound(this.sound);
                   window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
                } else if(this.sent && data.to_id == this.$route.params.to && data.from_id == this.id) {
                    this.sent = null
                    this.msgs.push(data);
                    console.log(data)
//                    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
                    this.sc();
                }
            });
           
        },
        methods: {
            sc(){
               window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);  
            },
            playSound(sound) {
                if (sound) {
                    var audio = new Audio(sound);
                    audio.play();
                }
            },

            isMine(id) {

                if (id == this.id) {
                    return true
                } else {
                    return false
                }


            },
            fetch() {
                
                let data = {
                    from: this.id,
                    to: this.$route.params.to
                };
                api.getChat(data).then(data => this.msgs = data)
            },

            send() {
                
                let data = {
                    id: this.id,
                    to: this.$route.params.to,
                    text: this.text
                };
                this.sent = true;
                api.sendMsg(data).then(() => {
                        this.text = '';
                    sock.emit('hello',data);
                    })
                    .catch((err) => console.log(err))
            },
            scro(){
                /*window.scroll({
                    top:16000,
                    behavior:'smooth'
                })*/
                
                
                elemnt.scrollIntoView(false);
            }
        },
        
        computed:{
            ms(){
                return this.text == ''
            }
        }
       
    }

</script>

<style>
    .fx {
        border-radius: 30px;

    }

    .fix {
        width: 100%;
        background-color: #fafafa;
        padding: 4px;
        position: fixed;
        bottom: 0px;
        left: 1%;
        right: 1%;
        padding-left: 10px;
        margin-top: 10px
    }
    .hi{
        height: 60px
    }
    .fixed{
        position: fixed;
        margin-bottom: 30px;
        top : 70px;
        z-index: 9999;
    }


</style>
