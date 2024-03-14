import request from '@/utils/request'

export const nameSearchAPI=(word)=>{
    return request({
        url: '/Product/search',
        method: 'get',
        params:{
           info:word
        }
      })
}