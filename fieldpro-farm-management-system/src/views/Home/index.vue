<script setup>
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
</script>

<template>
  
  <HomeBanner id="top" />
  <HomeNew id="new" />
</template>

<style scoped lang="scss">
.nav {
  position: fixed;
  top: 200px;
  right: 0;
  margin: 0;
  padding: 0;
  border-radius: 8px;
  width: 120px;
  background-color: rgb(219, 154, 23);
  border: 1px solid rgb(3, 3, 3);
  color: #e5e5e5;


  li {
    padding: 10px;
    height: 50px;
    line-height: 30px;
    &:hover {
      background-color: rgb(229, 173, 69);
    }

    &:first-child {
      margin-top: 5px;
    }

    &:last-child {
      margin-bottom: 5px;
    }

    a {
      margin-right: 4px;
      color: #fff;
    }
  }
}
</style>