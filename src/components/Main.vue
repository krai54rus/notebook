<script lang="ts" setup>
  import WidgetBlock from './main/WidgetBlock.vue'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  store.dispatch('module/loaditems')
  const data = computed(() => store.state.module.items)
</script>
<template>
  <div class="n-flex n-wp-100 n-hp-100" :class="$style['main']">
    <div class="n-wp-100 n-p-16" :class="$style['main-wrapper']">
      <WidgetBlock title="ToDo" :items="data"></WidgetBlock>
      <WidgetBlock title="ToDo" :items="data"></WidgetBlock>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: main;

  .#{$component} {
    flex-grow: 1;
    overflow: hidden;

    &-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
