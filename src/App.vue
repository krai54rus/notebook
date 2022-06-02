<script setup lang="ts">
  import Sidebar from '@/components/Sidebar.vue'
  import Content from '@/components/Content.vue'
</script>

<template>
  <div class="root">
    <Sidebar />
    <Content />
  </div>
</template>

<style lang="scss">
  $component: root;

  .#{$component} {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    // color: #2c3e50;
    // margin-top: 60px;
  }
</style>
