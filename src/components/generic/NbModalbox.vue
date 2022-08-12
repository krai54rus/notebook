<script lang="ts" setup>
  import { ref, computed } from 'vue'

  // interface Props {
  //   value: string
  //   placeholder: string
  //   resize: boolean
  // }

  // const props = withDefaults(defineProps<Props>(), {
  //   value: '',
  //   placeholder: 'Введите значение...',
  //   resize: false,
  // })

  const className = 'modalbox'

  const emit = defineEmits(['close', 'change'])
  const handleClose = params => {
    emit('close', params)
  }

  const handleChange = params => {
    emit('change', params)
  }
</script>
<template>
  <div
    class="n-m-auto n-p-16 n-flex n-flex-column n-justify-center n-align-center"
    :class="$style['modalbox']"
  >
    <div class="n-wp-100" :class="$style[`${className}__header`]">
      <slot name="header"></slot>
    </div>
    <div class="n-wp-100" :class="$style[`${className}__content`]">
      <slot name="content"></slot>
    </div>
    <div class="n-wp-100" :class="$style[`${className}__footer`]">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: modalbox;

  .#{$component} {
    background-color: var(--color-gray-bgc-main);
    border-radius: 2px;
    margin: 48px 0 80px;
    overflow: hidden;
    position: relative;
    width: 768px;
    min-height: 600px;
    z-index: 25;
    &__header {
      height: 60px;
    }
    &__content {
      flex-grow: 1;
    }
  }
</style>
