import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import App from '../App'

Vue.use(Router)

//根据chunkname的不同打包时候分级打包不同的JS，按需下载，chunkname如‘home’等
// const home = r => require.ensure([], () => r(require('../page/home/index')), 'home');
const home = r => require.ensure([], () => r(require('../page/home/cityselect')), 'home');
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city');
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite');


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
        //首页
        {
          path: '/home',
          component: home
        },
        //登录
        {
          path: '/login',
          component: login
        },
        //当前选择城市页
        {
          path: '/city/:cityid',
          component: city
        },
        {
          path:'msite',
          component:msite,
          meta:{keepAlive:true},//表示需要被缓存
        }


      ]
    }
  ]
})
