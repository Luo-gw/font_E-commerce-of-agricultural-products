

import request from "@/utils/request"


export const getVegetableAPI = (data) => {
    return request({
      url:'/Product/sortinfo1',
      method:'GET',
    })
}

export const getFruitAPI = (data) => {
  return request({
    url:'/Product/sortinfo3',
    method:'GET',
  })
}

export const getGropAPI = (data) => {
  return request({
    url:'/Product/sortinfo2',
    method:'GET',
  })
}
