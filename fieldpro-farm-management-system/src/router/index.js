import { createRouter, createWebHistory } from 'vue-router'


import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import Detail from '@/views/Detail/index.vue'
import fruits from '@/views/Category/fruits.vue'
import vegetables from '@/views/Category/vegetables.vue'
import grops from '@/views/Category/grops.vue'
import search from '@/views/Category/search.vue'
import Enroll from '@/views/Enroll/index.vue'
import Login from '@/views/Login/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Member from '@/views/Member/index.vue'
import Pay from '@/views/Pay/index.vue'
import Payback from '@/views/Pay/payback.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path:'category/:id',
        component:Category
      },
      {
        path: '/fruits',
        component: fruits
      },
      {
        path: '/vegetables',
        component: vegetables
      },
      {
        path: '/grops',
        component: grops
      },
      {
        path: '/search',
        component: search
      },
      {
        path:'detail/:productid',
        component:Detail
      },
      {
        path:'cartlist',
        component:CartList
      },
      {
        path:'checkout',
        component:Checkout
      },
      {
        path:'pay',
        component:Pay
      },
      {
        path:'payback',
        component:Payback
      },
      {
        path:'member',
        component:Member,
        children:[
          {
            path:'user',
            component:UserInfo
          },
          {
            path:'order',
            component:UserOrder
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/enroll',
    component: Enroll
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(){
    return{
      top:0
    }
  }
})

export default router
