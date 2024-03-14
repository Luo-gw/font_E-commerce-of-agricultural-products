//新增 封装用户相关接口函数
import request from "@/utils/mock"

// export const loginAPI=({name,password}) =>{
//     return request({
//         url:'/test',
//         method:'get',
//         data :{
//             name,
//             password
//         } 
            
//     })
// }


export function loginAPI(params) {
    /*登陆 */
    return request({
        url: '/Login/Get',
        method: 'get',
        params :{
            user_id: '11111111',
            password: '1111111111111'
        } 
    }) 
}
    