import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import App from '../App'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'APP',
      component: App,
      children:[{
        path:'',
        component: r => require.ensure([], () => r(require('../page/home/index')), 'home')
      }]
    }
  ]
})
