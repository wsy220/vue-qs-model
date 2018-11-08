import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import App from '../App'

Vue.use(Router)
const home = r => require.ensure([], () => r(require('../page/home/index')), 'home');
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          component: home
        },
        {
          path:'/login',
          component:login
        }


        ]
    }
  ]
})
