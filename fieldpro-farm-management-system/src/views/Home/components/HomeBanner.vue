<script setup>
import { onMounted, ref } from 'vue'

const bannerList = ref([])


</script>


<template>
  <div >
    <img src="@/assets/Banner/header.png">
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  //1268
  position: relative;
  width: 1200px;
  height: 500px;
  margin-left: 150px;
  margin-right: 130px;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>