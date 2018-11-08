import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'


// export const getfenlei = () => fetch('/api/app/profile/tags', {});
export const getfenlei = () => fetch('/v1/cities', {
  type: 'guess'
});

/**
 *获取验证码
 *
 */

export const mobileCode = phone => fetch('/v4/mobile/verify_code/send', {
  mobile: phone,
  scene: 'login',
  type: 'sms'
}, 'POST');

/**
 * 获取图片验证码
 */

export const getcaptchas = () => fetch("/v1/captchas", {}, 'POST');

/**
 * 检测帐号是否存在
 */
export const checkExsis = (checkNumber, type) => fetch("/v1/users/exists", {
  [type]: checkNumber,
  type
}, 'GET');
