<script lang="ts" setup>
  import { ref } from 'vue'

  type TInputType = 'regular' | 'outlined' | 'solo' | 'filled'
  type TInputSize = 'small' | 'normal'

  interface Props {
    value?: string
    label?: string
    type?: TInputType
    color?: string
    placeholder?: string
    size?: TInputSize
    noFocus?: boolean
    resize?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    value: '',
    label: '',
    type: 'solo',
    color: 'blue',
    placeholder: '',
    size: 'normal',
    noFocus: false,
    resize: false,
  })

  const emit = defineEmits(['input', 'change'])
  const inputRef = ref('inputRef')
  const isFocused = ref(false)
  const handleInput = (params: any) => {
    emit('input', params)
  }

  const handleChange = (params: any) => {
    emit('change', params)
  }

  const handlerFocus = () => {
    console.log('props.noFocus ', props.noFocus)
    if (props.noFocus) {
      return
    }

    isFocused.value = true
  }
</script>
<template>
  <div
    :class="{
      [$style['input']]: true,
      [$style[`input_${type}`]]: true,
      [$style['input_focused']]: isFocused,
    }"
    class="n-wp-100 n-flex n-flex-column"
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
      class="n-wp-100 n-px-8 n-pb-8"
      :class="{
        [$style['input__el']]: true,
        [$style[`input_${type}_focused`]]: isFocused,
        [$style[`input_${size}`]]: true,
        'n-pt-8': !label,
        'n-pt-16': label,
      }"
      id="inp"
      :value="value"
      :placeholder="!label ? placeholder : ''"
      @focus="handlerFocus()"
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
      font-size: var(--size-16);
      border-radius: var(--radius-sm);
    }

    &__label {
      position: absolute;
      top: 20px;
      transition: 0.3s;

      &-top {
        top: 5px;
        font-size: var(--size-12);
      }
    }

    &_normal {
      height: 56px;
    }

    &_small {
      height: 46px;
    }

    &_filled {
      border-bottom: 1px solid var(--color-black-main);

      & input {
        background-color: var(--color-gray-70);
      }
    }

    &_solo {
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
        0 1px 5px 0 rgb(0 0 0 / 12%);

      &_focused {
        border-bottom: 1px solid var(--color-blue-main);
        & input {
          border-left: none;
          border-top: none;
          border-right: none;
        }
      }
    }

    &_outlined {
      border: 1px solid var(--color-gray-main);
    }

    &_regular {
      border-bottom: 1px solid var(--color-black-main);
      &_focused {
        border-bottom: 1px solid var(--color-blue-main);
        & input {
          border-left: none;
          border-top: none;
          border-right: none;
        }
      }
    }
  }
</style>
