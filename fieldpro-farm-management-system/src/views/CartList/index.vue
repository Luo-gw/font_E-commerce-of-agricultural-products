<script setup>
import { useCartStore } from '@/store/cartStore'
import router from '@/router'
import { ElMessage } from 'element-plus';
import { useUserStore2 } from '@/store/uss';
const cartStore = useCartStore()

//单选的改变
const singleCheck = (i, selected) => {
    console.log(i, selected)
    //数组 修改对应选项的状态--id
    cartStore.singleCheck(i, selected)
}

const numChange = (i) => {
    //修改产品数量
    console.log('dddddddd')
    cartStore.numChange(i)
}


const pageto = () => {
    //修改产品数量
    const userStore = useUserStore2()
    if(userStore.userInfo.token){
        router.push({ path: '/checkout' });
    }
    else{
    ElMessage.error('您未登录，请登录后重试')
  }
}

//全选
 const allCheck = (selected) => { 
     cartStore.allCheck(selected)
 }

 const delCart=(i)=>{
    cartStore.delCart(i)
 }
</script>

<template>
    <div class="xtx-cart-page">
        <div class="container m-top-20">
            <div class="cart">
                <table>
                    <thead>
                        <tr>
                             <th width="120">
                                <!-- <el-checkbox :model-value="cartStore.isAll" @change="allCheck" /> -->
                            </th>
                            <th width="400">商品信息</th>
                            <th width="220">单价</th>
                            <th width="180">数量</th>
                            <th width="180">小计</th>
                            <th width="140">操作</th>
                        </tr>
                    </thead>
                    <!-- 商品列表 -->
                    <tbody>
                        <tr v-for="i in cartStore.cartList" :key="i.productid">
                            <td>
                                <!-- 单选框 -->
                                <el-checkbox :model-value="i.selected" @change="(selected) => singleCheck(i, selected)" />
                            </td>
                            <td>
                                <div class="goods">
                                    <RouterLink :to="`detail/${i.productid}`"><img :src="i.photo" alt="" /></RouterLink>
                                    <div>
                                        <p class="name ellipsis">
                                            {{ i.name }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="tc">
                                <p>&yen;{{ (i.pricediscount).toFixed(2) }}</p>
                            </td>
                            <td class="tc">
                                <el-input-number v-model="i.count" :min="1" @input.native="numChange(i)"/>
                            </td>
                            <td class="tc">
                                <p class="f16 red">&yen;{{ (i.pricediscount * i.count).toFixed(2) }}</p>
                            </td>
                            <td class="tc">
                                <p>
                                    <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                        @confirm="delCart(i)">
                                        <template #reference>
                                            <a href="javascript:;">删除</a>
                                        </template>
                                    </el-popconfirm>
                                </p>
                            </td>
                        </tr>
                        <tr v-if="cartStore.cartList.length === 0">
                            <td colspan="6">
                                <div class="cart-none">
                                    <el-empty description="购物车列表为空">
                                        <el-button type="primary">随便逛逛</el-button>
                                    </el-empty>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <!-- 操作栏 -->
            <div class="action">
                <div class="batch">
                    共 {{ cartStore.allCount }} 件商品，已选择 {{ cartStore.selectedCount }} 件，商品合计：
                    <span class="red">¥ {{ cartStore.selectedPrice.toFixed(2) }} </span>
                </div>
                <div class="total">
                    <el-button size="large" type="primary" @click="pageto">下单结算</el-button>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.xtx-cart-page {
    margin-top: 20px;

    .cart {
        background: #fff;
        color: #666;

        table {
            border-spacing: 0;
            border-collapse: collapse;
            line-height: 24px;

            th,
            td {
                padding: 10px;
                border-bottom: 1px solid #f5f5f5;

                &:first-child {
                    text-align: left;
                    padding-left: 30px;
                    color: #999;
                }
            }

            th {
                font-size: 16px;
                font-weight: normal;
                line-height: 50px;
            }
        }
    }

    .cart-none {
        text-align: center;
        padding: 120px 0;
        background: #fff;

        p {
            color: #999;
            padding: 20px 0;
        }
    }

    .tc {
        text-align: center;

        a {
            color: #54b59d;
        }

        .xtx-numbox {
            margin: 0 auto;
            width: 120px;
        }
    }

    .red {
        color: #a73333;
    }

    .green {
        color: #54b59d;
    }

    .f16 {
        font-size: 16px;
    }

    .goods {
        display: flex;
        align-items: center;
        height: 120px;

        img {
            width: 100px;
            height: 100px;
        }

        >div {
            width: 280px;
            font-size: 16px;
            padding-left: 10px;

            .attr {
                font-size: 14px;
                color: #999;
            }
        }
    }

    .action {
        display: flex;
        background: #fff;
        margin-top: 20px;
        height: 80px;
        align-items: center;
        font-size: 16px;
        justify-content: space-between;
        padding: 0 30px;

        .xtx-checkbox {
            color: #999;
        }

        .batch {
            a {
                margin-left: 20px;
            }
        }

        .red {
            font-size: 18px;
            margin-right: 20px;
            font-weight: bold;
        }
    }

    .tit {
        color: #666;
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
    }

}</style>