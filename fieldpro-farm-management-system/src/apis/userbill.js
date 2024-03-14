
import request from "@/utils/request"

export const getusersbillAPI = (id) => {
    return request({
      url:'Bill/customerinfo',
      method:'GET',
      params:{
        id:id
    }
    })
}

export function getpAPI(params) {
  return request({
    url: '/Bill/GetTrackingInfo',
    method: 'get',
    params:{subbillid:params.subbillid}
  })
}

export const getserviceAPI=(params)=> {
  return request({
    url: '/Service/allinfo',
    method: 'get',
    params:{id:params.id}
  })
}