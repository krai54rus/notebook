<script lang="ts" setup>
  import WidgetBlock from './main/WidgetBlock.vue'
</script>
<template>
  <div class="main">
    <div class="main-wrapper">
      <WidgetBlock title="ToDo"></WidgetBlock>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $component: main;

  .#{$component} {
    width: 100%;
    height: 100%;
    display: flex;
    flex-grow: 1;

    &-wrapper {
      width: 100%;
      padding: 16px;
    }
  }
</style>
