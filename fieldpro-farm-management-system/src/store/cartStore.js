//封装购物车模块
import { ref, computed,reactive} from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import {cartInsertAPI,findNewCartListAPI,changeSelectedAPI,numChangeAPI,delCartAPI} from '@/apis/cart'

import pinia from '@/store/store'
import { useUserStore2 } from './uss';
// SystemDataStore 可以在本文件中随意使用
//const SystemDataStore = useSystemDataStore(pinia);
//const userStore = useUserStore2(pinia)



//import {useUserStore}  from './user'
//一个加购物车的接口，一个删除的接口

 export const useCartStore = defineStore('cart', {
     //1.定义state
     state: () => ({
         cartList: reactive([]),
     }),
     //定义computed（计算）
     getters: {
        allCount(state){
            return state.cartList.length
        },
        allPrice(state){
            return state.cartList.reduce((a,c)=>a+c.count*c.pricediscount,0)         
        },
        //是否全选
        isAll(state){
            return state.cartList.every((item)=>item.selected)
        },
        //已选择数量
        selectedCount(state){
            //console.log('state.cartList[0].selected')
            //console.log(state.cartList[0].selected)
            return state.cartList.filter(item=>item.selected).length
        } ,
        selectedPrice(state){
            return state.cartList.filter(item=>item.selected).reduce((a,c)=>a+c.count*c.pricediscount,0)
        } 
       },
     //2.定义action
     actions:{
        updataList(userid){
            const a=findNewCartListAPI(userid).then((res)=>{
                console.log('xxx')  
                console.log(res)
                console.log(res.data)
                //resul=res.data
                this.cartList=res.data
                //console.log(resul)
                console.log(this.cartList)
                console.log(this.cartList.length)
                console.log('xxx')
            })           
        },

        async addCart(goods) {
            const userStore = useUserStore2()
            //添加购物车操作
             //已添加count ++，未添加直接push
             //(就是原本购物车里有过这个东西了，只用＋数量，否则需要增添)
              console.log('cartstore.js')
             //通过匹配传递过来的商品对象中的id能不能在cartlist中找到
             if(userStore.userInfo.token){
                //登录状态走接口
                console.log('购物车接口')
                console.log(goods.productid)
                console.log(userStore.userInfo.id)
                console.log(goods.count)
                const resul=reactive([])
                await cartInsertAPI(goods.productid,userStore.userInfo.id,goods.count)
                await this.updataList(userStore.userInfo.id)
                console.log('yyy')
                console.log('购物车接口')
                ElMessage.success('加入购物车成功')
                //console.log(this.cartList.length)
             }
             else{
                ElMessage.success('已成功加入到本地购物车')
                const item = this.cartList.find((item) => goods.productid === item.productid)
                if (item) {
                    //找到了
                   item.count+=goods.count
               } else {
                    //没有找到
                    this.cartList.push(goods)
               }
             }            
         },
        async delCart(goods){
            const userStore = useUserStore2()
 //删除购物车功能
 if(userStore.userInfo.token){
    //登录状态走接口
    console.log('购物车删除接口')
    console.log(goods.productid)
    console.log(userStore.userInfo.id)
    //cartInsertAPI(goods.productid,userStore.userInfo.id,goods.count)
    await delCartAPI(userStore.userInfo.id,goods.productid)
    //delCartAPI(userStore.userInfo.id,goods.productid)
    //console.log('购物车删除接口')
 
    //获取新列表
    await this.updataList(userStore.userInfo.id)
    //this.cartList=a.res.data
    //console.log('yyy')
    //console.log('购物车接口')
    //this.updataList(userStore.userInfo.id)
    ElMessage.success('删除成功')
 }
 else{
    ElMessage.success('本地删除成功')
    //找到要删除的下标值-splice
    const idx=this.cartList.findIndex((item)=> goods.productid === item.productid)
    this.cartList.splice(idx,1)
 }          
        },

        //单选功能
        singleCheck(goods,selected){
            const userStore = useUserStore2()
            //走接口
            if(userStore.userInfo.token){
                const item= this.cartList.find((item)=>item.productid===goods.productid)
                console.log('selected')
                console.log(selected)
                console.log('selected')
                console.log('0000')
                //item.selected=selected
                if(selected===false){
                    changeSelectedAPI(userStore.userInfo.id,goods.productid,0)
                    //console.log(a)
                    item.selected=selected
                }
                else{
                    changeSelectedAPI(userStore.userInfo.id,goods.productid,1)
                   // console.log(a)
                   item.selected=selected
                }
                
            }
            else{
           //通过goods.id找到要修改的那一项，然后把它的selected修改
           const item= this.cartList.find((item)=>item.productid===goods.productid)
           item.selected=selected
            }

        },
        
        //全选功能
        allCheck(selected){
            this.cartList.forEach(item=>item.selected=selected)
        },
      //已选择的合计价格
        numChange(goods){
            const userStore = useUserStore2()
            //走接口
            if(userStore.userInfo.token){
                const item= this.cartList.find((item)=>item.productid===goods.productid)
                item.count=goods.count
                numChangeAPI(userStore.userInfo.id,goods.productid,goods.count)
                console.log('dycdycdyc')
                console.log(goods.count)
                console.log('dycdycdyc')
            }
            else{
            }
        },
        clearCart(){
            this.cartList=[]
        }
     }
   })

//组合式，但写出来有问题
//  export const useCartStore = defineStore('cart', ()=>{
// //     //1.定义state
//      const cartList=ref([])
// //     //2.定义action
//      function addCart(goods){
//              //添加购物车操作
    
//              //已添加count ++，未添加直接push
//              //(就是原本购物车里有过这个东西了，只用＋数量，否则需要增添)
//              //console.log(this);
//              //通过匹配传递过来的商品对象中的id能不能在cartlist中找到
//              const item = this.cartList.find((item) => goods.id === item.id)
//              if (item) {
//                  //找到了
//                  item.count+=goods.count
//              } else {
//                  //没有找到
//                  this.cartList.push(goods)
//              }
//          }
//        function delCart(goods){
//       //删除购物车功能
//              //找到要删除的下标值-splice
//              const idx=this.cartList.findIndex((item)=> goods.id === item.id)
//              this.cartList.value.splice(idx,1)
//          }
//          //因为我们这里是公斤，不存在一件商品，所以就是购物车length
//          const allCount=computed(()=>cartList.length)
//        return{
//          cartList,
//          addCart,
//          delCart,
//         allCount,

//        }
//      })