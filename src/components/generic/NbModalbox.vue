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
  <nb-overlay>
    <div class="n-m-auto n-flex n-justify-center n-align-center">
      <div :class="$style[`${className}__header`]">
        <slot name="header"></slot>
      </div>
      <div :class="$style[`${className}__content`]">
        <slot name="content"></slot>
      </div>
      <div :class="$style[`${className}__footer`]">
        <slot name="footer"></slot>
      </div>
    </div>
  </nb-overlay>
</template>

<style lang="scss" module>
  $component: modalbox;

  .#{$component} {
    overflow: hidden;
    overflow-wrap: break-word;
    background-color: initial;
    box-shadow: none;
    height: 90px;
    margin: -1px;
    padding: 0;
  }
</style>
