<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore2 } from '@/store/uss'
import { getusersbillAPI, getserviceAPI, getpAPI } from '@/apis/userbill';

// const userStore = useUserStore2()
//     if(userStore.userInfo.token)

// 订单列表
const subbillidforfind=ref('')
const BillList = ref([])
const openbillList = ref([])//详情内部订单的主要信息
const openList = ref([])//详情内部商品的信息
const plist = ref([])
const plist1 = ref([])

const servicelist = ref([])//物流列表
const showDialog = ref(false)//订单详情
const showDialog1 = ref(false)
const showDialog3 = ref(false)//申请售后
const showDialog4 = ref(false)
const showDialog5 = ref(false)


const findsubid = async(num, productlist) => {
  console.log('num')
  console.log(num)
  console.log(productlist)
  for (var i = 0; i < productlist.length; i++) {
    if (i == num) {
      console.log('1111111')
      subbillidforfind.value = productlist[i].subbillid
    }
  }
  console.log('subbillidforfind')
  console.log(subbillidforfind.value)
}

const findfarmname = (num, productlist) => {
  for (var i = 0; i < productlist.length; i++) {
    if (productlist[i].farmid == num) {
      return (productlist[i].farmname)
    }
  }
}

const getplist1 = async (subbillidforfind) => {
  console.log('getplist1')
  console.log(subbillidforfind)
  let params = {
    subbillid: subbillidforfind
  }
  const result = await getpAPI(params);
  plist1.value = result.data;
  console.log("show plist1 data");
  console.log(result.data);

}



const relist = (arr) => {
  const obj = {};
  arr.forEach((item, index) => {
    console.log(item.farmid);
    if (!obj[item.farmid]) {
      obj[item.farmid] = item.farmid
    }
  });
  console.log(obj);
  return obj;
}

const emptyplist = () => {
  plist.value = []
}


const getplist = async (openList) => {
  for (var i = 0; i < openList.length; i++) {
    console.log(openList[i].subbillid)
    let params = {
      subbillid: openList[i].subbillid
    }
    const result = await getpAPI(params);
    plist[i] = result.data;
    console.log("show plist data");
    console.log(result.data);
  }
}



const getservicelist = async (num) => {
  //如果不设置token，括号里什么也没有
  console.log("show servicelist ")
  const params = { id: num }
  const result = await getserviceAPI(params);
  servicelist.value = result.data;
  //打印可以看一下后端返回的数据
  console.log("show servicelist data")
  console.log(result);
}



const look = (billitem) => {//查看详情
  showDialog.value = 1
  openbillList.value = billitem[0]
  openList.value = billitem[1]
  console.log('ccccccc')
  console.log(openbillList)
  console.log(openList)
}



const getBills = async () => {
  const userStore = useUserStore2()
  const res = await getusersbillAPI(userStore.userInfo.id)
  BillList.value = res.data
  console.log(BillList.value)
}

onMounted(() => getBills())
</script>

<template>
  <div class="order-container">

    <div class="main-container">
      <!-- 没有订单 -->
      <div class="holder-container" v-if="BillList.length === 0">
        <el-empty description="暂无订单数据" />
      </div>
      <!-- 订单列表 -->
      <div v-else>

        <div class="order-item" v-for="billitem in BillList" :key="billitem.id">

          <div class="head">
            <!-- <img :src="billitem[1][0].photo"> -->
            <div class="span1">
              <img :src="billitem[1][0].photo">
            </div>
            <div class="span2">
              <div class="title">包含商品： </div>
              <div class="title">{{ billitem[1][0].productname }} </div>
              <div class="title">{{ billitem[1][0].quality }} </div>
              <div class="title">数量：{{ billitem[1][0].productnumber }}</div>
            </div>
            <div class="span3">
              <el-button type="primary" round class="btn1" @click="look(billitem)">查看详情</el-button>
            </div>
          </div>
          <hr>
          <div class="footer">
            <div class="date">下单日期：{{ billitem[0].date.replace('T', ' ') }}</div>
            <div class="status" v-if="billitem[0].status == '待发货'" style="color:darksalmon;">订单状态：{{ billitem[0].status }}
            </div>
            <div class="status" v-if="billitem[0].status == '待收货'" style="color:brown;">订单状态：{{ billitem[0].status }}
            </div>
            <div class="status" v-if="billitem[0].status == '售后中'" style="color:darkblue;">订单状态：{{ billitem[0].status }}
            </div>
            <div class="status" v-if="billitem[0].status == '已完成'" style="color:chartreuse;">订单状态：{{ billitem[0].status }}
            </div>
            <div class="status" v-if="billitem[0].status == '待付款'" style="color:cadetblue;">订单状态：{{ billitem[0].status }}
            </div>
            <div class="price">总价：{{ billitem[0].price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- 订单弹窗  -->
  <el-dialog title="订单详情" v-model="showDialog" width="50%" :before-close="handleClose" :append-to-body="true">
    <p style="font-size:16px;">订单状态：{{ openbillList.status }}</p>
    <p style="font-size:16px;">订单日期：{{ openbillList.date.replace('T', ' ') }}</p>
    <p style="font-size:16px;">收件地址：{{ openbillList.address }}</p>
    <p style="font-size:16px;">收件人姓名：{{ openbillList.receiver_name }}</p>
    <p style="font-size:16px;">收件人号码：{{ openbillList.phonenumber }}</p>
    <p style="font-size:16px;">产品详情：</p>
    <div v-for="product in openList" class="text item" style="display: flex; align-items: center;">
      <img :src="product.photo" style="width: 60px;height: 60px; margin-right: 5px;" />
      <p style="font-size:16px;">{{ product.productname + '(' + product.quality + ") ×" + product.productnumber + "千克" }}
      </p>
    </div>
    <div style="display: flex;align-items: center;justify-content: space-between;">
      <p style="font-size:16px;">订单总价：{{ (openbillList.price * 1).toFixed(2) }}元</p>
      <div style="display: flex;">

        <el-button v-if="openbillList.status != '待付款'" style="font-size: medium;float: right; padding: 8px 0;"
          @click="showDialog4 = true, emptyplist(), getplist(openList)">查看物流</el-button>




        <el-button v-if="openbillList.status != '待付款'" style="font-size: medium;float: right; padding: 8px 0;"
          @click="showDialog1 = true, getservicelist(openbillList.billid)">售后历史</el-button>




        <!-- <el-button v-if="openbillList.status !== '售后中' && openbillList.status !== '待付款'"
          style="font-size: medium;float: right; padding: 8px 0;" type="primary"
          @click="showDialog3 = true, getservicelist(openbillList.billid)">申请售后</el-button> -->
      </div>
    </div>
  </el-dialog>


  <!-- 售后历史弹窗 分配弹窗号：1 -->
  <el-dialog title="售后历史" v-model="showDialog1" width="40%" :before-close="handleClose">
    <div v-for="item in servicelist">
      <p style="font-size:16px;">售货类型：{{ item.type }}</p>
      <p style="font-size:16px;">发起时间：{{ item.start_Date.replace('T', ' ') }}</p>
      <p style="font-size:16px;">结束时间：{{ item.end_Date.replace('T', ' ') }}</p>
      <p style="font-size:16px;">顾客请求：{{ item.request }}</p>
      <p style="font-size:16px;">回复结果：{{ item.result }}</p>
      <p style="font-size:16px;">售后工号：{{ item.salesperson_Id }}</p>
      <p style="font-size:16px;">售后单号：{{ item.service_Id }}</p>
    </div>
  </el-dialog>

  <!-- 查看号弹窗 分配弹窗号：4 -->
  <el-dialog title="物流详情" v-model="showDialog4" width="40%" :before-close="handleClose">
    <div v-for="(num, index) in relist(openList)" class="text item">
      <p style="font-size:15px;">农场：{{ findfarmname(num, openList) }}</p>
      <div v-for="(product, index) in openList" class="text item">
        <div v-if="num == product.farmid" style="font-size:15px ;">产品：{{
          product.productname + '（' + product.quality + '） ×' + product.productnumber + '千克' }}</div>
      </div>
      <el-button @click="findsubid(num, openList);console.log(subbillidforfind);showDialog5 = true; getplist1(subbillidforfind)">物流信息查看</el-button>
    </div>
  </el-dialog>


  <!-- , getplist1(subbillidforfind) -->


  <!-- 查看物流弹窗 分配弹窗号：5 -->
  <el-dialog title="提示" v-model="showDialog5" width="40%" :before-close="handleClose">
    <div v-if="plist1.status == '201'" style="font-size:20px;padding-left: 40%">快递单号错误</div>
    <div v-if="plist1.status == '203'" style="font-size:20px;">快递公司不存在</div>
    <div v-if="plist1.status == '204'" style="font-size:20px;">快递公司识别失败</div>
    <div v-if="plist1.status == '205'" style="font-size:20px;">该单号没有信息</div>
    <div v-if="plist1.status == '207'" style="font-size:20px;">该单号被限制，错误单号</div>
    <div v-if="plist1.status == '0'">
      <p style="font-size:20px;">{{ plist1.result.expName + ' ' + plist1.result.number }}</p>

      <div v-for="pack in plist1.result.list">
        <p style="font-size:20px;">{{ pack.time }}</p>
        <p style="font-size:15px;">{{ pack.status }}</p>

      </div>
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.order-container {
  padding: 5px 20px;

  .main-container {
    min-height: 500px;

    //background-color: #65e3a8;
    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: space-around;
      //align-items: center;
    }
  }

  .order-item {
    margin-top: 20px;
    height: 150px;
    width: 100%;
    background-color: rgb(231, 231, 231);

    .head {
      display: flex;
      height: 100px;

      .span1 {
        height: 100px;
        width: 20%;

        img {
          position: relative;
          left: 20px;
          padding: 10px;
          height: 100px;
          width: 100px;
        }
      }

      .span2 {
        height: 100px;
        width: 55%;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .title {
          font-size: 15px;
        }
      }

      .span3 {
        height: 40px;
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: space-around;


        .btn1 {
          position: relative;
          top: 50px;
        }
      }
    }


    .footer {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .date {
        font-size: 15px;
      }

      .status {
        font-size: 15px;
      }

      .price {
        font-size: 15px;
      }
    }
  }
}



.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>


// //display: block;
// height: 160px;
//     background-color: #0ea0bd;
//     margin-bottom: 20px;
//     border: 1px solid #f5f5f5;

//     .head {
//       display: inline;
//       height: 160px;
//       width: 100px;
//       background: #f5f5f5;
//       padding: 0 5px;

//       img {
//         position: relative;
//         left: 1000px;
//         top: 10px;
//         height: 80px;
//         width: 80px;
//       }

//       .body {
//         position: relative;
//         top: -70px;
//         left: 130px;
//         display: flex;
//         flex-wrap: nowrap;
//         margin-left: 10px;
//         height: 100px;
//         width: 60%;
//         justify-content: space-around;

//         .title {
//           display: inline;
//           font-size: 20px;
//           color: black;
//         }
//       }

//       .btn1 {
//         position: relative;
//         top: -130px;
//         left: 830px;
//         padding: 4px 8px;
//         height: 30px;
//         width: 70px;
//         border-radius: 8px;
//         background-color: #007BFF;
//         color: #fff;
//         border: none;
//         margin-top: 15px;
//         cursor: pointer;
//       }
//     }

//     .bottom {
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: flex-start;

//       height: 40px;
//       background-color: burlywood;
//     }
//   }