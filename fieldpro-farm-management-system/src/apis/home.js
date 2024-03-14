import httpInstance from '@/utils/http'
import request from '@/utils/request'
//获取banner
export function getBannerAPI(){
    return httpInstance({
        url:'/home/banner'
    })
}

/*新鲜好物**/
export const findNewAPI = () => {
    return request({
      url:'/Product/productinfo'
    })
  }

  /*人气推荐*/
  export const getHotAPI = () => {
    return  httpInstance({
        url:'home/hot',
        method: 'get'
    })
  }

  export const getGoodsAPI = () => {
    return  request({
        url:'/Product/productinfo',
        method: 'get'
    })
  }

