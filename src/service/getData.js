import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 获取重点人群的分类
 */

// export const getfenlei = () => fetch('/api/app/profile/tags', {});
export const getfenlei = () => fetch('/v1/cities', {
  type: 'guess'
});



