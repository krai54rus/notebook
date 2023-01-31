<script lang="ts" setup>
  import TestWrapper from './test/TestWrapper.vue'
  import { ref, computed, provide, onMounted } from 'vue'
  import { useTestStore } from '@/pinia/test'
  import api from '@/api'

  const items = ref([])
  onMounted(async () => {
    const res: any = await api(
      'https://jsonplaceholder.typicode.com/users',
      'GET'
    )
    if (res && res.data) {
      items.value = res.data
    }

    console.log(res)
  })
  const data = computed(() => items)
  provide('data', items.value)
</script>
<template>
  <div class="n-flex n-wp-100 n-hp-100" :class="$style['main']">
    <TestWrapper></TestWrapper>
  </div>
</template>

<style lang="scss" module>
  $component: main;

  .#{$component} {
    flex-grow: 1;
    overflow: hidden;
  }
</style>
