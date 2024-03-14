<template>
   
    <div class="goodsITEM1" v-if="goods[1].length === 1">
       <img :src="goods[1][0][0].photo" alt="产品图片" />
   <!-- name -->
       <p class="name ellipsis">{{ goods[0][0].name }}</p>
       <div class="level">
           <RouterLink :to="`detail/${goods[1][0][0].productid}`" class="level-item">
               <span class="btn1">
                   <p>&yen;{{ goods[1][0][0].price }}</p>
               </span>
               <span class="btn2" style="background-color:#d6861d">
                   <p>{{ goods[1][0][0].quality }}</p>
               </span>
               <span class="btn3" :style="{ 'visibility': goods[1][0][0].stock === 0 ? 'visible' : 'hidden' }">
                   <p>无货</p>
               </span>
           </RouterLink>
       </div>
   </div>


   <div class="goodsITEM2" v-if="goods[1].length === 2">
       <img :src="goods[1][0][0].photo" alt="产品图片" />
       <!-- name -->
       <p class="name ellipsis">{{ goods[0][0].name }}</p>
       <div class="level">

           <RouterLink :to="`detail/${goods[1][0][0].productid}`" class="level-item">
               <span class="btn1">
                   <p>&yen;{{ goods[1][0][0].price }}</p>
               </span>
               <span class="btn2" style="background-color:#d6861d">
                   <p>{{ goods[1][0][0].quality }}</p>
               </span>
               <span class="btn3" :style="{ 'visibility': goods[1][0][0].stock === 0 ? 'visible' : 'hidden' }">
                   <p>无货</p>
               </span>
           </RouterLink>

           <RouterLink :to="`detail/${goods[1][1][0].productid}`" class="level-item">

               <span class="btn1">
                   <p>&yen;{{ goods[1][1][0].price }}</p>
               </span>
               <span class="btn2" style="background-color:#e99e3c">
                   <p>{{ goods[1][1][0].quality }}</p>
               </span>
               <span class="btn3" :style="{ 'visibility': goods[1][1][0].stock === 0 ? 'visible' : 'hidden' }">
                   <p>无货</p>
               </span>

           </RouterLink>

       </div>
   </div> 


   <div class="goodsITEM3" v-if="goods[1].length === 3">
       <RouterLink :to="`detail/${goods[1][0].productid}`" >
       <img :src="goods[1][0].photo" alt="产品图片" />
       <!-- name -->
       <p class="name ellipsis">{{ goods[0].name }}</p>
       </RouterLink>
       <div class="level">

           <RouterLink :to="`detail/${goods[1][0].productid}`" class="level-item">
               <span class="btn1">
                   <p>&yen;{{ goods[1][0].price }}</p>
               </span>
               <span class="btn2" >
                   <p>{{ goods[1][0].quality }}</p>
               </span>
               <span class="btn3" :style="{ 'visibility': goods[1][0].promotion !== 0 ? 'visible' : 'hidden' }">
                   <p>{{ goods[1][0].promotion*10 }}折</p>
               </span>
           </RouterLink>

           <RouterLink :to="`detail/${goods[1][1].productid}`" class="level-item">

               <span class="btn1">
                   <p>&yen;{{ goods[1][1].price }}</p>
               </span>
               <span class="btn2" >
                   <p>{{ goods[1][1].quality }}</p>
               </span>
               <span class="btn3" :style="{ 'visibility': goods[1][0].promotion !== 0 ? 'visible' : 'hidden' }">
                   <p>{{ goods[1][0].promotion*10 }}折</p>
               </span>

           </RouterLink>

           <RouterLink :to="`detail/${goods[1][2].productid}`" class="level-item">
               <span class="btn1">
                   <p>&yen;{{ goods[1][2].price }}</p>
               </span>
               <span class="btn2" >
                   <p>{{ goods[1][2].quality }}</p>
               </span>
               <span class="btn3" :style="{ 'visibility': goods[1][0].promotion !== 0 ? 'visible' : 'hidden' }">
                   <p>{{ goods[1][0].promotion*10 }}折</p>
               </span>

           </RouterLink>

       </div>
   </div>
</template>

<script setup>

defineProps({
   goods: {
       type: Object,
       default: () => { }
   },
})

</script>

<style scoped lang="scss">
// .goodsITEM1 {
//     display: block;
//     width: 280px;
//     height: 420px;
//     padding: 10px 15px;
//     text-align: center;
//     transition: all .5s;

//     //background-color: #cf4444;
//     &:hover {
//         transform: translate3d(0, -3px, 0);
//         box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
//     }

//     img {
//         width: 200px;
//         height: 180px;
//     }

//     p {
//         padding-top: 10px;
//     }

//     .name {
//         font-size: 16px;
//     }

//     .level {
//         margin-left: 5px;
//         right: 20px;
//         margin-top: 10px;
//         width: 240px;
//         height: 160px;
//         display: flex;

//         justify-content: center;
//         flex-wrap: wrap;
//         //background-color: #fff;

//         .level-item {
//             margin-top: 6px;
//             //以一个level绑定一个按钮跳转
//             height: 150px;
//             width: 200px;
//             display: flex;
//             flex-direction: column;
//             justify-content: space-around;
//             align-items: center;
//             //background-color: #fff4cf;
//             border-radius: 16px;

//             &:hover {
//                 background-color: #f3e8c5;
//             }

//             .btn1 {
//                 //价格
//                 color: #cf4444;
//                 font-size: 16px;
//                 width: 80px;
//                 border-radius: 20px;
//                 height: 35px;
//             }

//             .btn2 {
//                 //等级
//                 color: #000000;
//                 font-size: 12px;
//                 line-height: 20px;
//                 width: 60px;
//                 border-radius: 20px;
//                 height: 35px;
//             }

//             .btn3 {
//                 //有货无货
//                 color: #d1d1d1;
//                 font-size: 10px;
//                 width: 50px;
//                 background-color: #a8a8a8;
//                 border-radius: 17px;
//                 height: 30px;
//             }
//         }
//     }
// }


// .goodsITEM2 {
//     display: block;
//     width: 280px;
//     height: 420px;
//     padding: 10px 15px;
//     text-align: center;
//     transition: all .5s;

//     &:hover {
//         transform: translate3d(0, -3px, 0);
//         box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
//     }

//     img {
//         width: 200px;
//         height: 180px;
//     }

//     p {
//         padding-top: 10px;
//     }

//     .name {
//         font-size: 16px;
//     }

//     .level {
//         margin-left: 10px;
//         right: 20px;
//         margin-top: 10px;
//         width: 220px;
//         height: 160px;
//         display: flex;
//         justify-content: space-around;
//         //background-color: #fff;

//         .level-item {
//             margin-top: 6px;
//             //以一个level绑定一个按钮跳转
//             height: 150px;
//             width: 80px;
//             display: flex;
//             flex-direction: column;
//             justify-content: space-around;
//             align-items: center;
//             background-color: #fff4cf;
//             border-radius: 16px;

//             &:hover {
//                 background-color: #f3e8c5;
//             }

//             .btn1 {
//                 //价格
//                 color: #cf4444;
//                 font-size: 16px;
//                 width: 80px;
//                 border-radius: 20px;
//                 height: 35px;
//             }

//             .btn2 {
//                 //等级
//                 color: #e4dfd9;
//                 font-size: 12px;
//                 line-height: 20px;
//                 width: 60px;
//                 border-radius: 20px;
//                 height: 35px;
//             }

//             .btn3 {
//                 //有货无货
//                 color: #d1d1d1;
//                 font-size: 10px;
//                 width: 50px;
//                 background-color: #a8a8a8;
//                 border-radius: 17px;
//                 height: 30px;
//             }
//         }
//     }
// }



.goodsITEM3 {
   display: block;
   width: 280px;
   height: 380px;
   padding: 10px 5px;
   text-align: center;
   transition: all .5s;
   background-color: #fff;
   &:hover {
       transform: translate3d(0, -3px, 0);
       box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
   }

   img {
       width: 200px;
       height: 180px;
   }

   p {
       padding-top: 10px;
   }

   .name {
       font-size: 16px;
   }

   .level {
       //margin-left: 4px;
       //right: 20px;
       margin-top: 10px;
       width: 250px;
       height: 100px;
       display: flex;
       justify-content: space-around;
       //background-color: #a8a8a8;

       .level-item {
           margin-top: 6px;
           //以一个level绑定一个按钮跳转
           height: 100px;
           width: 80px;
           display: flex;
           flex-direction: column;
           justify-content: space-around;
           align-items: center;
           background-color: #fff4cf;
           border-radius: 16px;

           &:hover {
               background-color: #f3e8c5;
           }

           .btn1 {
               //价格
               color: #cf4444;
               font-size: 16px;
               width: 80px;
               //border-radius: 20px;
               height: 35px;
           }

           .btn2 {
               //等级
               color: #000000;
               font-size: 16px;
               line-height: 20px;
               width: 60px;
               border-radius: 20px;
               height: 35px;
           }

           .btn3 {
               //有货无货
               color: #dca83f;
               font-size: 15px;
               width: 50px;
               border-radius: 17px;
               height: 30px;
           }
       }
   }
}
</style>