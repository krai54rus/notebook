<script setup lang="ts">
  defineProps<{
    item?: any
  }>()
</script>

<template>
  <router-link
    class="n-flex n-justify-center n-align-center"
    :class="$style['table-item']"
    :to="`/todo/table/${item.id}`"
  >
    <div :class="$style['table-item__title']">
      <span>{{ item.name }}</span>
    </div>
  </router-link>
</template>

<style lang="scss" module>
  $component: table-item;

  .#{$component} {
    width: 200px;
    height: 100px;
    background-color: var(--color-blue-main);
    padding: 10px;
    border-radius: 3px;
    transition: 0.2s;
    &__title {
      color: var(--color-white);
      font-size: 16px;
      font-weight: 700;
    }

    &:hover {
      opacity: 0.9;
    }
  }
</style>
