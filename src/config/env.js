/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl = '';


if (process.env.NODE_ENV == 'development') {
  // imgBaseUrl = '/img/';
  imgBaseUrl = '//elm.cangdu.org/img/';
  baseUrl = '//elm.cangdu.org';//链接网络后台程序
  // baseUrl = 'http://localhost:8001';//链接本地后台程序
  // baseUrl = 'http://localhost:3000';//链接本地后台程序



} else if (process.env.NODE_ENV == 'production') {
  baseUrl = '//elm.cangdu.org';
  imgBaseUrl = '//elm.cangdu.org/img/';
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl,
}
