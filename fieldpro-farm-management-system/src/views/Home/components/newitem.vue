
<template>
    <RouterLink :to="`detail/${goods.productid}`" class="goodsITEM1">
        <img :src="goods.photo" alt="产品图片" />
             <!-- name -->
             <p class="name ellipsis">{{ goods.name }}</p>
        <div class="level">
            <div class="level-item">
                <span class="btn1">
                    <p>&yen;{{ (goods.pricediscount).toFixed(2) }}</p>
                </span>
                <span class="btn2">
                    <p>{{ goods.quality }}</p>
                </span>
                <span class="btn3" :style="{ 'visibility': goods.promotion !== 0 ? 'visible' : 'hidden' }">
                    <p>{{ (goods.promotion * 10).toFixed(1) }}折</p>
                </span>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>


defineProps({
    goods: {
        type: Object,
        default: () => { }
    },
})

let goodsnum = 0;


</script>

<style scoped lang="scss">
.goodsITEM1 {
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
        margin-top: 10px;
        width: 250px;
        height: 100px;
        display: flex;
        justify-content: space-around;

        .level-item {
            margin-top: 6px;
            margin-left:17px ;
            //以一个level绑定一个按钮跳转
            height: 80px;
            width: 250px;
            display: flex;
            //flex-direction: column;
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