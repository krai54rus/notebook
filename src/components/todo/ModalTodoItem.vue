<script setup lang="ts">
  interface Props {
    item: any
  }

  const props = withDefaults(defineProps<Props>(), {
    item: {},
  })

  const emit = defineEmits(['close'])
</script>

<template>
  <nb-overlay @close="emit('close')">
    <nb-modalbox>
      <template #header>
        <div>
          <h2>{{ item.title }}</h2>
        </div>
      </template>
      <template #content>
        <div>
          <h2>{{ item.description }}</h2>
        </div>
      </template>
      <template #footer>
        <div class="n-wp-100 n-flex n-justify-end">
          <nb-button text="Сохранить" />
        </div>
      </template>
    </nb-modalbox>
  </nb-overlay>
</template>

<style lang="scss" module>
  $component: modal-todo-item;

  .#{$component} {
    background-color: #f4f5f7;
    border-radius: 2px;
    display: none;
    // margin: 48px 0 80px;
    overflow: hidden;
    position: relative;
    width: 768px;
    z-index: 25;
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
