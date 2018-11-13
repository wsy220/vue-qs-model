// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './store';
// import './style/common'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import "./style/mui/mui.min.css"
// import mui from './style/mui/mui.min'

import {routerMode} from './config/env'
import './config/rem'


Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI);
// mui.init();
// mui('#scroll').scroll({
//     indicators: true //是否显示滚动条
//   });





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mode: routerMode
})
