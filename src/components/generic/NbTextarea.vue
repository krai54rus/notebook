<script lang="ts" setup>
  import { ref } from 'vue'

  interface Props {
    value: string
    placeholder: string
    resize: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    value: '',
    placeholder: 'Введите значение...',
    resize: false,
  })

  const emit = defineEmits(['input', 'change'])
  const handleInput = params => {
    emit('input', params)
  }

  const handleChange = params => {
    emit('change', params)
  }

  //   const emit = defineEmits<{
  //   (e: 'change', id: number): void
  //   (e: 'update', value: string): void
  // }>()
</script>
<template>
  <div class="n-flex n-justify-center n-align-center">
    <textarea
      :class="$style['textarea']"
      :value="value"
      :placeholder="placeholder"
      :resize="resize"
    ></textarea>
  </div>
</template>

<style lang="scss" module>
  $component: textarea;

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
