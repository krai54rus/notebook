<script lang="ts" setup>
  import { ref } from 'vue'

  type TInputType = 'regular' | 'outlined' | 'solo' | 'filled'

  interface Props {
    value: string
    label?: string
    type?: TInputType
    color?: string
    placeholder: string
    resize: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    value: '',
    label: '',
    type: 'solo',
    color: 'blue',
    placeholder: 'Введите значение...',
    resize: false,
  })

  const emit = defineEmits(['input', 'change'])
  const inputRef = ref('inputRef')
  const isFocused = ref(false)
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
  <div
    :class="{
      [$style['input']]: true,
      [$style[`input-${type}`]]: true,
      [$style['input-focused']]: isFocused,
    }"
    class="n-flex n-flex-column"
  >
    <label
      v-if="label"
      for="inp"
      class="n-pl-8"
      :class="{
        [$style['input__label']]: true,
        [$style['input__label-top']]: isFocused || value !== '',
      }"
      >{{ label }}</label
    >
    <input
      ref="inputRef"
      class="n-wp-100 n-p-8"
      :class="$style['input__el']"
      id="inp"
      :value="value"
      :placeholder="placeholder"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="handleInput($event)"
      @change="handleChange($event)"
    />
  </div>
</template>

<style lang="scss" module>
  $component: input;

  .#{$component} {
    // overflow: hidden;
    overflow-wrap: break-word;
    background-color: initial;
    box-shadow: none;
    border-radius: var(--radius-sm);
    border: 1px solid transparent;
    position: relative;

    // &__wrapper {
    //   font-size: var(--size-14);
    // }

    &__el {
      font-size: var(--size-14);
      border-radius: var(--radius-sm);
    }

    &__label {
      position: absolute;
      top: 10px;

      &-top {
        top: -20px;
      }
    }

    &-filled {
      border-bottom: 1px solid var(--color-black-main);

      & input {
        background-color: var(--color-gray-70);
      }
    }

    &-solo {
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
        0 1px 5px 0 rgb(0 0 0 / 12%);
    }

    &-outlined {
      border: 1px solid var(--color-gray-main);
    }

    &-regular {
      border-bottom: 1px solid var(--color-black-main);
    }

    &-focused {
      border: 1px solid var(--color-blue-main);
    }
    // height: 90px;
    // margin: -1px;
    // padding: 0;
  }
</style>
