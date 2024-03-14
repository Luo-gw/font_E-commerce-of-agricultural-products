//axios基础封装
import axios from "axios";

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const httpInstance=axios.create({
    baseURL:'http://58.87.89.170:8081',
    timeout:5000,
    async:true,
    crossDomainL:true
})

//拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    return config
  }, e => Promise.reject(e))
  
  // axios响应式拦截器
  httpInstance.interceptors.response.use(res => res.data, e => {
    //错误提示
    ElMessage({
      type:'warning',
      message:e.response.data.message
    })
    return Promise.reject(e)
  })

export default httpInstance