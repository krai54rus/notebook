<script lang="ts" setup>
  import { ref } from 'vue'

  // const store = useTestStore()
  // store.loaditems('module/loaditems')
  // const data = computed(() => store.items)
  const items = ref([
    { id: 1, val: '0' },
    { id: 2, val: '10' },
    { id: 3, val: '20' },
    { id: 4, val: '30' },
    { id: 5, val: '40' },
    { id: 6, val: '50' },
    { id: 7, val: '60' },
    { id: 8, val: '70' },
    { id: 9, val: '80' },
  ])
</script>
<template>
  <div class="n-flex n-wp-100 n-hp-100">
    <div class="n-wp-100 n-p-16 n-flex n-justify-center">
      <div
        v-for="color in items"
        :key="color.id"
        class="n-mr-8"
        :class="[$style['color-item'], $style[`color-item_blue-${color.val}`]]"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: color-item;

  .#{$component} {
    flex-grow: 1;
    width: 50px;
    height: 50px;

    &-wrapper {
      // display: grid;
      // grid-template-columns: 200px 200px;
    }
    &__list {
      padding: 12px;
      width: 500px;
      // background-color: var(--color-gray-40);
    }
    &__item {
      width: 100px;
      padding: 4px 8px;
      // background-color: var(--color-white);
      margin-bottom: 10px;
      border-radius: var(--radius-md);
      z-index: 100;
      // cursor: pointer;
    }
    &_blue {
      &-0 {
        background-color: hsl(207, 90%, 95%);
      }
      &-10 {
        background-color: hsl(207, 90%, 90%);
      }
      &-20 {
        background-color: hsl(207, 90%, 80%);
      }
      &-30 {
        background-color: hsl(207, 90%, 70%);
      }
      &-40 {
        background-color: hsl(207, 90%, 60%);
      }
      &-50 {
        background-color: hsl(207, 90%, 50%);
      }
      &-60 {
        background-color: hsl(207, 90%, 40%);
      }
      &-70 {
        background-color: hsl(207, 90%, 20%);
      }
      &-80 {
        background-color: hsl(207, 90%, 10%);
      }
    }
  }
</style>
