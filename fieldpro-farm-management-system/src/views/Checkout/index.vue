<script setup>
import { reactive } from 'vue';

import { CheckInfoAPI,subOrderAPI } from '@/apis/checkout'
import { onMounted, ref } from 'vue'
import router from '@/router'
import { useUserStore2 } from '@/store/uss'
//import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/cartStore'



const cartStore = useCartStore()
//const route=useRouter()
//const defaultAddress = ref({})//默认地址
const showDialog = ref(false)
const totalPrice = ref(0)



const close1 = () => {
  showDialog.value = false
  Info.change = 1
}

const checkInfo = ref([])  // 订单对象
const write = () => {
  showDialog.value = 1
}

const Info = reactive({
  receiver: '',
  phoneNum: '',
  address: '',
  change: 0
})

const subOrder=async()=>{
  const userStore = useUserStore2()
  console.log('rrrrrrrrrrrr')
  // console.log(Info.address)
  // console.log(userStore.userInfo.id)
  // console.log(Info.phoneNum)
  // console.log(Info.receiver)
  const res = await subOrderAPI(Info.address,userStore.userInfo.id,Info.phoneNum,Info.receiver)
  console.log('rrrrrrrrrrrr')
  // console.log(res)
  // console.log(res.data)
  var pricetotal=totalPrice.value
  var orderID=res.data
  //res应该是订单号
    //id:orderID,
    router.push({ path: '/pay', query: { price:pricetotal,id:orderID } });
  cartStore.updataList(userStore.userInfo.id)
}

const getCheckInfo = async () => {

  const userStore = useUserStore2()
  console.log(userStore.userInfo.id)
  const res = await CheckInfoAPI(userStore.userInfo.id)
  console.log(res)
  checkInfo.value = res.data
  var i = 0
  while (i < checkInfo.value.length) {
    console.log(res.data[i].pricediscount)
    totalPrice.value += res.data[i].pricediscount * res.data[i].count
    i++
  }
  console.log(totalPrice)
  console.log('订单信息')
  console.log(checkInfo)
  //默认地址
  //checkInfo.value.userAddresses.find(item => item.isDefault === 0)
  //defaultAddress.value = item
}

onMounted(() => getCheckInfo())

</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">

        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text">
              <!-- && Info.receiver && Info.phoneNum && Info.address -->
              <div class="action">
                <div class="none" v-if="Info.change != 1">您需要先添加收货地址才可提交订单。</div>
                <div class="submit" v-else>
                  <el-button type="primary" size="large" @click="subOrder">提交订单</el-button>
                </div>
              </div>
              <ul>
                <li><span>收<i />货<i />人：</span>{{ Info.receiver }}</li>
                <li><span>联系方式：</span>{{ Info.phoneNum }}</li>
                <li><span>收货地址：</span>{{ Info.address }} </li>
              </ul>
            </div>
            <el-button size="large" @click="write">填写收货信息</el-button>
          </div>
        </div>

        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.length }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ totalPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>

        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <!-- <th width="170">实付</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.photo" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.detail }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.pricediscount.toFixed(2) }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ (i.pricediscount * i.count).toFixed(2) }}</td>
                <!-- <td>&yen;{{ i.pricediscount*i.count }}</td> -->
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
  <!-- 添地址 -->
  <el-dialog v-model="showDialog" title="填写收货地址" width="30%" center>
    <div class="addressWrapper">

      <el-form :model="Info">
        <el-form-item label="收货人姓名" label-width="90px">
          <el-input v-model="Info.receiver" required: true />
        </el-form-item>
        <el-form-item label="电话号码" label-width="90px">
          <el-input v-model="Info.phoneNum" required: true />
        </el-form-item>
        <el-form-item label="收货地址" label-width="90px">
          <el-input v-model="Info.address" required: true />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="close1">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: #4ddaa9;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: #4ddaa9;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: #d84726;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: #4ddaa9;
      background: lighten(#4ddaa9, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>