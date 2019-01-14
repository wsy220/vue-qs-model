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

/**
 *获取验证码
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

export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {
  username,
  password,
  captcha_code
}, 'POST');

/**
 *个人中心里编辑地址
 */

export const getAddressList = (user_id) => fetch('/v1/users/' + user_id + '/addresses');
/**
 * 获取用户信息
 */

export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')});
/**
 * 获取当前城市
 */
export const currentcity = number => fetch('/v1/cities/' + number);
/**
 *搜索结果
 */
export const searchplace = (cityid, value) => fetch('/v1/pois', {
  type: 'search',
  city_id: cityid,
  keyword: value
});
/**
 *获取食品分类
 *
 */
export const msiteFoodTypes=geohash=>fetch('/v2/index_entry',{
  geohash,
  group_type:'1',
  'flags[]':'F'
});
/**
 * 获取msite页面地址信息
 *
 */
export const misteAddress=geohash=>fetch('/v2/pois/'+geohash);

/**
 * 获取msite商铺列表
 */

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
  let supportStr = '';
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id;
    }
  });
  let data = {
    latitude,
    longitude,
    offset,
    limit: '5',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  };
  return fetch('/shopping/restaurants', data);
};
/**
 * 搜索结果
 * */
export const searchRestaurant=(geohash,keyword)=>fetch('/v4/restaurants',{
  'extras[]': 'restaurant_activity',
  geohash,
  keyword,
  type: 'search'
})
/**
 *获取order列表内容
 */
export const getOrderList = (user_id, offset) => fetch('/bos/v2/users/' + user_id + '/orders', {
  limit: 10,
  offset,
});


