import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
});

/**
 * 获取热门城市
 *
 * @returns {Promise<*>}
 */
export const hotcity = () => fetch('/v1/cities', {
  type: 'hot'
});


/**
 * 获取首页所有城市
 */

export const groupcity = () => fetch('/v1/cities', {
  type: 'group'
});

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
export const checkExsis = (checkNumber, type) => fetch('/v1/users/exists', {
  [type]: checkNumber,
  type
});
/**
 * 账号密码登录
 */

export const accountLogin=(username,password,captcha_code)=>fetch('/v2/login',{username, password, captcha_code},'POST');

/**
 *个人中心里编辑地址
 */

export const getAddressList = (user_id) => fetch('/v1/users/'+user_id+'/addresses');
/**
 * 获取用户信息
 */

export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});
/**
 * 获取当前城市
 *
 * @param number
 * @returns {Promise<*>}
 */
export const currentcity = number => fetch('/v1/cities/' + number);
