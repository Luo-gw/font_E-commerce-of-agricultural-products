<script setup>
import { getDetail } from '@/apis/detail'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import ImageView from '@/components/ImageView/index.vue'
import { ElMessage } from 'element-plus'
import { useCartStore } from '@/store/cartStore'
const cartStore = useCartStore()
const goods = ref({})
const price0=ref(0)
const route = useRoute()
const getGoods = async () => {
    const res = await getDetail(route.params)
    console.log('----')
    console.log(res)
    console.log('6666')
    goods.value = res.data[0]
    console.log(goods.value)
    console.log('----')
    console.log(goods.value.name)
    console.log('----')
    price0.value=goods.value.pricediscount

}



onMounted(() => getGoods())

//count 商品数量
const count = ref(1)
const countChange = (count) => {
    console.log(count)
}
//添加购物车
const addCart = () => {
    //     //不用选择sku,不必判断
    //     //且有货才做展示
    //     //！！！！！！！！！！！！！！这里需要传品种等级
    if (count.value === null || count.value === 0 || count.value < 0) {
        ElMessage.error('数量有误')
        return
    }
    if (count.value >goods.value.stock) {
        ElMessage.error('数量不得大于库存')
        return
    }
    cartStore.addCart({
        productid: goods.value.productid,
        name: goods.value.name,
        pricediscount: goods.value.pricediscount,
        price: goods.value.price,
        //咱们的只是一张图片
        photo: goods.value.photo,
        quality: goods.value.quality,
        count: count.value,//数量
        selected: false,//选中
    })
    //ElMessage.success('已成功加入购物车')
}
</script>

<template>
    <div class="xtx-goods-page">
        <div class="container">
            <!-- 商品信息 -->
            <div class="info-container">
                <div>
                    <div class="goods-info">
                        <div class="media">
                            <!-- 图片预览区 -->
                            <!-- 我们传输总需要一张图片，直接给image就行，别给数组 -->
                            <ImageView :image-list="goods.photo" />
                            <!-- 统计数量 -->
                        </div>
                        <p>

                        </p>
                        <div class="spec">
                            <!-- 商品信息区 -->
                            <p class="g-name"> {{ goods.name }} </p>
                            <p class="g-quality">{{ goods.quality }}</p>
                            <p class="g-desc">{{ goods.detail }} </p>
                            <p class="g-price">
                                <span>{{ price0.toFixed(2) }}</span>
                                <span>{{ goods.price }}</span>
                            </p>
                        <br>
                            <p> <span>库存： {{ goods.stock }}</span></p>

                           
                            <div class="g-service">
                                <dl>
                                    <dt>服务</dt>
                                    <dd>
                                        <span>快速退款</span>
                                        <span>免费包邮</span>
                                    </dd>
                                </dl>
                            </div>
                            <div>
                                &nbsp
                            </div>
                            <p>
                              
                            </p>
                            <!-- 数据组件 -->
                            <el-input-number type="number" v-model="count" required :min="0" @change="countChange" />
                            <div>

                            </div>
                            <!-- 按钮组件 -->
                            <div>
                                <el-button size="large" class="btn" @click="addCart">
                                    加入购物车
                                </el-button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
    .goods-info {
        min-height: 600px;
        background: #fff;
        display: flex;

        .media {
            width: 580px;
            height: 600px;
            padding: 30px 50px;
        }

        .spec {
            flex: 1;
            padding: 30px 30px 30px 0;
        }
    }

    .goods-footer {
        display: flex;
        margin-top: 20px;

        .goods-article {
            width: 940px;
            margin-right: 20px;
        }

        .goods-aside {
            width: 280px;
            min-height: 1000px;
        }
    }

    .goods-tabs {
        min-height: 600px;
        background: #fff;
    }

    .goods-warn {
        min-height: 600px;
        background: #fff;
        margin-top: 20px;
    }

    .number-box {
        display: flex;
        align-items: center;

        .label {
            width: 60px;
            color: #999;
            padding-left: 10px;
        }
    }

    .g-name {
        font-size: 28px;
    }

    .g-desc {
        color: #999;
        margin-top: 10px;
        font-size: 20px;
    }

    .g-quality {
        font-size: 22px;
        color: rgb(234, 174, 33)
    }

    .g-price {
        margin-top: 10px;

        span {
            &::before {
                content: "¥";
                font-size: 14px;
            }

            &:first-child {
                color: #ad2f2f;
                margin-right: 10px;
                font-size: 22px;
            }

            &:last-child {
                color: #999;
                text-decoration: line-through;
                font-size: 16px;
            }
        }
    }

    .g-service {
        background: #f5f5f5;
        width: 220px;
        padding: 20px 10px 0 10px;
        margin-top: 10px;

        dl {
            padding-bottom: 20px;
            display: flex;
            align-items: center;

            dt {
                width: 50px;
                color: #999;
            }

            dd {
                color: #666;

                &:last-child {
                    span {
                        margin-right: 10px;

                        &::before {
                            content: "•";
                            color: #68cc95;
                            margin-right: 2px;
                        }
                    }

                    a {
                        color: #68cc95;
                    }
                }
            }
        }
    }
}

.goods-tabs {
    min-height: 600px;
    background: #fff;

    nav {
        height: 70px;
        line-height: 70px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        a {
            padding: 0 40px;
            font-size: 18px;
            position: relative;

            >span {
                color: #ad2f2f;
                font-size: 16px;
                margin-left: 10px;
            }
        }
    }
}

.goods-detail {
    padding: 40px;

    .attrs {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;

        li {
            display: flex;
            margin-bottom: 10px;
            width: 50%;

            .dt {
                width: 100px;
                color: #999;
            }

            .dd {
                flex: 1;
                color: #666;
            }
        }
    }

    >img {
        width: 100%;
    }
}

.btn {
    margin-top: 20px;
}

.bread-container {
    padding: 25px 0;
}
</style>