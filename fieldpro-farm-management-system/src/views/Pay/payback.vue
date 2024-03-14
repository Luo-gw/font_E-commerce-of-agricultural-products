<script setup>
import { useRoute } from "vue-router"
import { ref } from "vue";
import router from "@/router";

const route = useRoute()
var price = (route.query.price)
var ispaid = route.query.is

const dingdan = () => {
  router.push({ path: '/member/order' })
}

const shouye = () => {
  router.push({ path: '/' })

  const route = useRoute()
  var price = (route.query.price)
  var ispaid = route.query.is
  const dingdan = () => {
    router.push({ path: '/member/order' })
  }
  const shouye = () => {
    router.push({ path: '/' })
  }
}
</script>


<template>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 支付结果 -->
      <div v-if="ispaid === '1'" class="pay-result">
        <span class="iconfont icon-queren2 green"></span>
        <p class="tit">支付成功</p>
        <p class="tip">我们将尽快为您发货</p>
        <p>支付金额：<span>{{ (price * 1).toFixed(2) }}</span></p>
        <div class="btn">
          <el-button type="primary" style="margin-right:20px" @click="dingdan">查看订单</el-button>
          <el-button @click="shouye">进入首页</el-button>
        </div>
      </div>
      <div class="pay-result" v-else>
        <span class="iconfont icon-shanchu red"></span>
        <p class="tit">支付失败</p>
        <p class="tip">您已放弃该订单</p>
        <p>金额：<span>{{ (price * 1).toFixed(2) }}</span></p>
        <div class="btn">
          <el-button type="primary" style="margin-right:20px" @click="dingdan">查看订单</el-button>
          <el-button @click="shouye">进入首页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  margin-top: 20px;

  >.iconfont {
    font-size: 100px;
  }

  .green {
    color: #1dc779;
  }

  .red {
    color: #c53939;
  }

  .tit {
    font-size: 24px;
  }

  .tip {
    color: #999;
  }

  p {
    line-height: 40px;
    font-size: 16px;
  }

  .btn {
    margin-top: 50px;
  }

  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>