
import request from '@/utils/request'
export const getDetail=(params)=>{


    return request({
        url: '/Product/selectid',
        method: 'get',
        params: {
            id: params.productid,
          }
      })
}



