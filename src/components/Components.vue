<script lang="ts" setup>
  import { computed } from 'vue'
  import { useTestStore } from '@/pinia/test'

  const store = useTestStore()
  store.loaditems()
  const data = computed(() => store.items)
</script>
<template>
  <div class="n-flex n-wp-100 n-hp-100" :class="$style['components']">
    <div class="n-wp-100 n-p-32 n-flex" :class="$style['components-wrapper']">
      <div class="n-w-100 n-mr-12">
        <nb-input value="test test" type="regular" label="label"></nb-input>
      </div>
      <div class="n-w-100 n-mr-12">
        <nb-input value="test" type="solo"></nb-input>
      </div>
      <div class="n-w-100 n-mr-12">
        <nb-input value="test" type="filled"></nb-input>
      </div>
      <div class="n-w-100 n-mr-12">
        <nb-input value="test" type="outlined"></nb-input>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: components;

  .#{$component} {
    flex-grow: 1;
    overflow: hidden;

    &-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
