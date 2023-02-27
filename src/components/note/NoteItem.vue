<script setup lang="ts">
  defineProps<{
    item?: any
  }>()
</script>

<template>
  <div
    class="n-flex n-align-center n-flex-column n-radius--full-lg"
    :class="$style['note-item']"
  >
    <div class="n-px-16 n-pt-12 n-wp-100" :class="$style['note-item__title']">
      <span>{{ item.title }}</span>
    </div>
    <div class="n-px-16 n-pt-4" :class="$style['note-item__description']">
      <span>{{ item.description }}</span>
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
    transition: 0.2s;
    &__title {
      color: var(--color-white);
      font-size: 16px;
      font-weight: 700;
    }

    // &:hover {
    //   opacity: 0.9;
    // }
  }
</style>
