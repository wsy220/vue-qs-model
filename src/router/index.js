import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

//根据chunkname的不同打包时候分级打包不同的JS，按需下载，chunkname如‘home’等
// const home = r => require.ensure([], () => r(require('../page/home/index')), 'home');
const home = r => require.ensure([], () => r(require('../page/home/cityselect')), 'home');
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city');
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite');
const search=r=>require.ensure([], () => r(require('../page/search/search')), 'search');
const order=r=>require.ensure([], () => r(require('../page/order/order')), 'order');
const profile=r=>require.ensure([], () => r(require('../page/profile/profile')), 'profile');



//测试mock的商品列表页面
const LineSource=r => require.ensure([], () => r(require('../page/List_mock/LineSource')), 'LineSource');

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
        //所有商铺列表
        {
          path:'msite',
          component:msite,
          meta:{keepAlive:true},//表示需要被缓存
        },
        //footer搜索
        {
          path:"search/:geohash",
          component:search
        },
        //footer订单
        {
          path:"/order",
          component:order
        },
        //footer我的
        {
          path:"/profile",
          component:profile
        },

        //mock演示路由
        {
          path:'/LineSource',
          component:LineSource,
        }
      ]
    }
  ]
})
