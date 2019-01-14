import {getRequest} from '../../config/axios';
//import {getStore} from '../config/mUtils'

/**
 * 获取首页默认地址
 */
export var cityGuess_axios;
getRequest('/v1/cities',{
  type: 'guess'
}).then(resp=>{
  cityGuess_axios=resp;
});




