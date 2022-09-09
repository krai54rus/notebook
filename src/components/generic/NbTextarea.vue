<script lang="ts" setup>
  import { ref } from 'vue'

  interface Props {
    value?: string
    placeholder?: string
    resize?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    value: '',
    placeholder: '',
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
  <div
    :class="{
      [$style['textarea']]: true,
      [$style[`textarea_${type}`]]: true,
      [$style['textarea_focused']]: isFocused,
    }"
    class="n-flex n-flex-column"
  >
    <label
      v-if="label"
      for="inp"
      class="n-pl-8"
      :class="{
        [$style['textarea__label']]: true,
        [$style['textarea__label-top']]: isFocused || value !== '',
      }"
      >{{ label }}</label
    >
    <textarea
      :class="$style['textarea__el']"
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
    border: 1px solid transparent;
    position: relative;

    &__el {
      font-size: var(--size-16);
      border-radius: var(--radius-sm);
      height: 56px;
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
