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
    <div
      class="n-radius--top-lg n-px-16 n-pt-12 n-pb-4 n-wp-100"
      :class="$style['note-item__title']"
    >
      <span>{{ item.title }}</span>
    </div>
    <div
      class="n-px-16 n-py-4 n-full-size"
      :class="$style['note-item__description']"
    >
      <span class="ellipsis-3-lines">{{ item.description }}</span>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: note-item;

  .#{$component} {
    width: 200px;
    height: 100px;
    // background-color: var(--color-blue-main);
    background-color: var(--color-white);
    transition: 0.2s;
    cursor: pointer;
    &__title {
      background-color: #fbbc04;
      color: var(--color-white);
      font-size: 16px;
      font-weight: 700;
    }

    &:hover {
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 1px 3px 1px rgba(60, 64, 67, 0.15);
      // opacity: 0.9;
    }
  }
</style>
