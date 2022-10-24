<script setup lang="ts">
  defineProps<{
    item?: any
  }>()
</script>

<template>
  <div
    class="n-flex n-justify-center n-align-center"
    :class="$style['note-item']"
  >
    <div :class="$style['note-item__title']">
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: note-item;

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
