import request from '@/utils/request'

// 获取订单详情接口
export const CheckInfoAPI=(id)=>{
     return request(({
         url:'/Cart/selectinfo',
         method:'get',
         params:{
            customer_id:id
         }
     }))
 }

 export const subOrderAPI=(address,customer_id,phone_number,receiver_name)=>{
    return request(({
        url:'/Bill/addbill',
        method:'post',
        params:{
            address:address,
            customer_id:customer_id,
            phone_number:phone_number,
            receiver_name:receiver_name
        }
    }))
}