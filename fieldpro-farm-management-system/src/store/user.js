//管理用户数据
import { login } from '@/apis/login'
import { ref } from 'vue'
import{ defineStore } from 'pinia'

export const useUserStore = defineStore('user',() => {
    //1 定义管理用户数据的state
    const userInfo=ref({})
    //2.定义获取数据接口函数action
    const getUserInfo=async (params)=>{
        const res = await login(params)
        userInfo.value=res
    }
    //3 以对象的格式把state和action retun回去
    return{
        userInfo,
        getUserInfo
    }
},{
    persist: true,
  }
)

