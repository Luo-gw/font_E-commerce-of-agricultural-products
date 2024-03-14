//购物车 的接口
import request from '@/utils/request'

export const PayAPI=(billid)=>{
    return request({
        url: '/Bill/pay',
        method: 'post',
        params:{
            bill_id:billid
        }
      })
}