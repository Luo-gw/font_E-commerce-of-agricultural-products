import axios from 'axios'
import { MessageBox, Message } from 'element-plus'
import store from '@/store'

const service = axios.create({
    //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    //baseURL:'https://localhost:8080/',
    baseURL:'http://58.87.89.170:8081',//这个应该是把后端部署了
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000, // request timeout
    //withCredentials: true//携带cookie
    async:true,
    crossDomain:true,
  })

  
  
  //暂时没搞懂拦截器该怎么用
  // service.interceptors.response.use(res => res.data, e => {
  //   //错误提示
  //   ElMessage({
  //     type:'warning',
  //     message:e.response.data.message
  //   })
  //   return Promise.reject(e)
  // })

 
  export default service