//购物车 的接口
import request from '@/utils/request'

// import { useUserStore2 } from '@/store/uss';
// const userStore = useUserStore2()
            //添加购物车操作
export const cartInsertAPI=(productid,id,count)=>{
    return request({
        url: '/Cart/addproduct',
        method: 'post',
        params:{
            product_id:productid,
            customer_id:id,
            product_num:count
        }
      })
}

//获取最新列表
export const findNewCartListAPI=(id)=>{
    return request({
        url: '/Cart/cartinfo',
       params:{
        customer_id:id
       }
      })
}


export const changeSelectedAPI=(customer_id,product_id,selected)=>{
    return request({
        url:'/Cart/select',
        method:'put',
        params:{
            customer_id:customer_id,
            product_id:product_id,
            mode:selected
        }
    })
}


export const numChangeAPI=(customer_id,product_id,count)=>{
    return request({
        url:'/Cart/change',
        method:'put',
        params:{
            customer_id:customer_id,
            product_id:product_id,
            number:count
        }
    })
}


export const delCartAPI=(customer_id,product_id)=>{
    return request({
        url:'/Cart/move',
        method:'delete',
        params:{
            customer_id:customer_id,
            product_id:product_id,       
        }
    })
}


export const mergeCartAPI=(customer_id,product_id,count)=>{
    console.log("ffffff")
    console.log(customer_id)
    console.log(product_id)
    console.log(count)
    console.log("ffffff")
    return request({
        url: '/Cart/addproduct',
        method: 'post',
        params:{
            customer_id:customer_id,
            product_id:product_id,     
            product_num:count
        }
    })
}