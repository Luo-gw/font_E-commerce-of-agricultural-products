<template>
    <LayoutFixed />
    
    <LayoutHeader />
    <LayoutNav />
    <!-- 二级路由出口 -->
    <RouterView />
</template>


<script setup>
import LayoutFixed from './components/LayoutFixed.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
</script>