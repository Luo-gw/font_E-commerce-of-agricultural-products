<script setup>
import HomePanel from './HomePanel.vue'
import { findNewAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'
import newitem from './newitem.vue'
const newList =ref([])

const getNewList =async()=>{
    const res =await findNewAPI()
    //console.log('!!!')
    newList.value=res.data
    //console.log(newList.value)
    //console.log('!!!')
}

onMounted(()=>getNewList())
</script>

<template>
  <HomePanel title="精心推荐" sub-title="新鲜佳物 品质靠谱" >

  <ul class="goods-list">
    <newitem v-for="goods in newList" :goods="goods" :key="goods.productid" />
    <!-- <li v-for="item in newList" :key="item.id">
      <RouterLink :to="`detail/${item.productid}`">
        <img :src="item.photo" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
        <p>特级</p>
      </RouterLink>
    </li> -->
  </ul>
  </HomePanel>
  
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: #cf4444;
    }
  }
}
</style>