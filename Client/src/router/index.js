import Vue from 'vue'
import Router from 'vue-router'
import chat from '../components/chat'
import login from '../components/login'
import signup from '../components/signup'
import home from '../components/home'
import chats from '../components/chats'
import auth from '../components/auth'
import auth2 from '../components/auth2'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/chat/:to',
            name: 'chat',
            component: chat,
            beforeEnter: auth
        },
        {
            path:'/login',
            name:'login',
            component:login,
            beforeEnter: auth2
            
        },
        {
            path:'/signup',
            name:'signup',
            component:signup,
            beforeEnter: auth2
        },{
            path:'/',
            name:'home',
            component:home,
           beforeEnter: auth
            
        },
        {
            path:'/chats',
            name:'chats',
            component:chats,
            beforeEnter: auth
        }

  ]
})
