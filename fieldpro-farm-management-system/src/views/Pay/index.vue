<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from "vue-router"
import router from '@/router'
import { PayAPI } from '@/apis/pay';
const route = useRoute()
const paid = ref(0)
const showDialog = ref(false)
//var billid=route.query.id
var price = route.query.price
var billID = route.query.id



const write = () => {
  showDialog.value = 1
}
const close1 = () => {
  showDialog.value = false
  paid.value = 1
  if (paid.value === 1) {
    //走成功的接口
    PayAPI(billID)
    console.log('跳转')
    console.log(paid.value)
    router.push({ path: '/payback', query: { is: paid.value, price: price } });
  }
}


const close0 = () => {
  showDialog.value = false
  paid.value = 0
  if (paid.value === 0) {
    //走成功的接口
    PayAPI(billID)
    console.log('跳转')
    console.log(paid.value)
    router.push({ path: '/payback', query: { is: paid.value, price: price } });
  }
}

const getinfo = async () => {
  //var billid=route.query.id
  //var price0 = route.query.price
  //console.log('ZZZZZZZZZZZZ')
  //console.log(price0)
  //console.log(billID)
  //console.log(billid)
}
onMounted(() => getinfo())
</script>


<template>
  <div class="pay-page">
    <div class="container">
      <!-- 付款信息 -->
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{ (price * 1).toFixed(2) }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" @click="write"></a>
          <a class="btn alipay" @click="write"></a>
        </div>
      </div>
    </div>
  </div>

  <!-- 添地址 -->
  <el-dialog v-model="showDialog" title="确认支付" width="30%" center>
    <template #footer>
      <el-button type="info" round @click="close0">取消支付</el-button>
      <el-button type="success" round @click="close1">确认支付</el-button>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
</template>

<style scoped lang="scss">
.pay-page {
  margin-top: 20px;
}

.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;

  .icon {
    font-size: 80px;
    color: #1dc779;
  }

  .tip {
    padding-left: 10px;
    flex: 1;

    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }

      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }

  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }

      &:last-child {
        color: #c11818;
        font-size: 20px;
      }
    }
  }
}

.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;

  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;

    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;

    &.active,
    &:hover {
      border-color: #32f8bc;
    }

    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat center / contain;
    }

    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat center / contain;
    }
  }
}</style>