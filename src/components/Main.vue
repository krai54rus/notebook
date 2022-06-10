<script lang="ts" setup>
  import WidgetBlock from './main/WidgetBlock.vue'
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  store.dispatch('module/loaditems')
  const data = computed(() => store.state.module.items)
</script>
<template>
  <div :class="$style['main']">
    <div :class="$style['main-wrapper']">
      <WidgetBlock title="ToDo" :items="data"></WidgetBlock>
      <WidgetBlock title="ToDo" :items="data"></WidgetBlock>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: main;

  .#{$component} {
    width: 100%;
    height: 100%;
    display: flex;
    flex-grow: 1;
    overflow: hidden;

    &-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      padding: 16px;
    }
  }
</style>
