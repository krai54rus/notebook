<script setup lang="ts">
  import { computed } from 'vue'
  const data = computed(() => [])
</script>

<template>
  <h1>About</h1>
  <div
    class="n-flex n-justify-center n-align-center"
    :class="$style['data-list']"
  >
    <div class="data-item" v-for="item in data">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<style lang="scss" module>
  .data {
    &-list {
      flex-wrap: wrap;
    }
  }
</style>
