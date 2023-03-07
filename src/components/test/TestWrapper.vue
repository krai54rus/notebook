<script lang="ts" setup>
  import WidgetBlock from '../main/WidgetBlock.vue'
  import { inject } from 'vue'
  const data = inject('data', () => [])
</script>
<template>
  <div class="n-wp-100 n-p-16" :class="$style['main-wrapper']">
    <WidgetBlock title="ToDo" :items="data"></WidgetBlock>
    <WidgetBlock title="ToDo" :items="data"></WidgetBlock>
    <WidgetBlock title="ToDo" :items="data"></WidgetBlock>
  </div>
</template>

<style lang="scss" module>
  $component: main;

  .#{$component} {
    &-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
