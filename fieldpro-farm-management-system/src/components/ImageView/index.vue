<script setup>
// 图片列表


//const image = imageList[0]

defineProps({
    imageList: {
        type: Image,
        default: () => []
    } 
})

</script>


<template>
    <div class="goods-image">
        <!--大图-->
        <div class="middle" ref="target">
            <img :src="imageList" alt="" />
        </div>
        <!-- 放大镜大图 -->
    </div>
</template>

<style scoped lang="scss">
.goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;

    .middle {
        width: 400px;
        height: 338px;
    }
}
</style>