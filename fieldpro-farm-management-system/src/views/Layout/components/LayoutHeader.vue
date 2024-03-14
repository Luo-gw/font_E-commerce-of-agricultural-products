<script setup>
import HeaderCart from './HeaderCart.vue'
import router from '@/router'
//import { defineEmits } from 'vue';
import { useRoute } from "vue-router";
import { ElMessage } from 'element-plus';

const route = useRoute()

const viewchange = () => {

  var name = document.getElementById("searchBtn").value;
  console.log('ssss')
  console.log(name)
  console.log('ssss')
  if(route.path==='/'){
    router.push({ path: '/search', query: { word: name } });
  }
  else{
    ElMessage.error('')
  }
  console.log('ssss')
}



</script>

<template>
  <header class='app-header'>
    <div class="container">

      <!-- 渲染导航列表 -->
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li>
          <RouterLink to="/grops">谷物</RouterLink>
        </li>
        <li>
          <RouterLink to="/vegetables">蔬菜</RouterLink>
        </li>
        <li>
          <RouterLink to="/fruits">水果</RouterLink>
        </li>
      </ul>
      <li class="home-text">
       
      </li>
      <h1 class="logo">
        <RouterLink to="/">首页</RouterLink>
      </h1>
      <div class="icon-unuse">

      </div>
      <div class="search">
        <i class="iconfont icon-search" @click="viewchange"></i>
        <input type="text" placeholder="搜一搜" id="searchBtn">
      </div>
      <!-- 头部购物车 -->
      <HeaderCart />
    </div>
  </header>
</template>


<style scoped lang='scss'>
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  .home-text {
    width: 110px;
    font-size: 20px;
    color: #00b203;
    display: flex;
    padding-left: 2px;
    position: relative;
  }

  .logo {
    width: 200px;
    position: relative;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 35px / contain;
    }
  }

  .app-header-nav {
    width: 400px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;

      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;

        &:hover {
          color: #27ba9b;
          border-bottom: 1px solid #27ba9b;
        }
      }

      .active {
        color: #27ba9b;
        border-bottom: 1px solid #27ba9b;
      }
    }
  }

  //unuse用于占位
  .icon-unuse {
    width: 150px;
    height: 32px;
    position: relative;
    line-height: 32px;
  }

  .search {
    width: 400px;
    height: 32px;
    position: relative;
    border-radius: 15px;
    border: 2px solid #e7e7e7;

    line-height: 32px;


    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 120px;
      padding-left: 5px;
      color: #363636;
    }
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: #e26237;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>