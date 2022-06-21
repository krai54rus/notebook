<script setup lang="ts">
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  store.dispatch('module/loaditems')
  const data = computed(() => store.state.module.items)
</script>

<template>
  <h1>About</h1>
  <div
    class="n-flex n-justify-center n-align-center"
    :class="$style['data-list']"
  >
    <div class="data-item" v-for="item in data">
      <span>{{ item.id }}</span>
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
