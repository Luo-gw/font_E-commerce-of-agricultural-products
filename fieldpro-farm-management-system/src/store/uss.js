import { login } from '@/apis/login'
import { defineStore } from "pinia";
import { useCartStore } from '@/store/cartStore'
import { mergeCartAPI } from '@/apis/cart';
//const cartStore = useCartStore()

export const useUserStore2 = defineStore("token", {
  state: () => {
    return {
      userInfo: {},
    };
  },
  getters: {

  },
  actions: {
    increment() {
      this.count++
    },
    async getUserInfo(params) {
      const res = await login(params)
      this.userInfo = res.data[0]
      console.log('uss')
      console.log(this.userInfo)
      const cartStore = useCartStore()
      console.log(this.userInfo.id)
      console.log(cartStore.cartList.length)
      console.log(cartStore.cartList)
      console.log('uss')
      // let a=await mergeCartAPI(this.userInfo.id, cartStore.cartList.map(item => {
      //   console.log('???')
      //    console.log(item.productid)
      //    console.log(item.count)
      //   return {
      //     product_id:item.productid,
      //     count:item.count
      //   }
      // }))
      var i = 0;
while (i < cartStore.cartList.length) {
  await mergeCartAPI(this.userInfo.id, cartStore.cartList[i].productid, cartStore.cartList[i].count)
  i++;
  // console.log('aaaaaaaa')
  //     console.log(a)
  //     console.log('aaaaaaaa')
}
      
      
      cartStore.updataList(this.userInfo.id)
    },
    clearUserInfo() {
      this.userInfo = {}
      //清除购物车
      const cartStore = useCartStore()
      cartStore.clearCart()
    }
  },
  //持久化存储重点---开启
  //这个时候数据默认是存在localStorage
  persist: {
    enabled: true,	//开启
    storage: localStorage,	//修改存储位置
    key: 'userInfo',	//设置存储的key
    paths: ['userInfo'],//指定要长久化的字段
  },
});



