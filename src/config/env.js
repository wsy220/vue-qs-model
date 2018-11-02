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
  imgBaseUrl = '/img/';
  baseUrl = '//elm.cangdu.org';

} else if (process.env.NODE_ENV == 'production') {
  // baseUrl = '//elm.cangdu.org';
  imgBaseUrl = '//elm.cangdu.org/img/';
  baseUrl = 'http://pt.70jiahu.com';
  // imgBaseUrl = 'http://pt.70jiahu.com';
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl,
}