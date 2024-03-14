<script setup>
//import { getGoodsAPI } from '@/apis/home'
import { nameSearchAPI } from '@/apis/search'
import { onMounted,ref } from  'vue'
import goodsitem from '../Category/components/goodsitem0.vue'
import {useRoute} from "vue-router"

const route=useRoute()
//const productSearchAPI=nameSearchAPI()
var name=route.query.word


//获取数据列表
const goodList =ref([])
const getGoods = async()=>{
    console.log(name)
    const res =await nameSearchAPI(name)
    goodList.value=res.data
    console.log('search')
    console.log(goodList.value)
}

onMounted(()=>getGoods())
</script>

<template>
    <div class="container ">
        <div class="sub-container">
            <div class="body" >
                <!-- 商品列表-->
                    <goodsitem v-for="goods in goodList" :goods="goods" :key="goods.id" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sub-container {
    padding: 20px 10px;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: #df4a4a;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
}
</style>