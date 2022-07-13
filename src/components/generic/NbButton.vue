<script lang="ts" setup>
  import { ref } from 'vue'
  interface Props {
    text?: string
    color?: string
    size?: string
    outline?: boolean
    depressed?: boolean
    plain?: boolean
    block?: boolean
    disabled?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    text: '',
    color: 'white',
    size: 'normal',
    outline: false,
    plain: false,
    depressed: false,
    disabled: false,
  })

  const emit = defineEmits(['click'])
  const handleClick = params => {
    emit('click', params)
  }

  //   const emit = defineEmits<{
  //   (e: 'change', id: number): void
  //   (e: 'update', value: string): void
  // }>()
</script>
<template>
  <div
    class="n-flex n-justify-center n-align-center"
    :class="{
      [$style['button']]: true,
      [$style[`button_${size}`]]: true,
      [$style[`button_color_${color}`]]: true,
      [$style['button_outline']]: outline,
      [$style['button_plain']]: plain,
      [$style['button_depressed']]: depressed,
      [$style['button_disabled']]: disabled,
    }"
    @click="handleClick()"
  >
    <div :class="$style['button__before-text']">
      <slot name="before-text"></slot>
    </div>
    <div class="n-flex" :class="$style['button__text']">
      <span>{{ text }}</span>
    </div>
    <div :class="$style['button__after-text']">
      <slot name="after-text"></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: button;

  .#{$component} {
    border-style: solid;
    border-width: 1px;
    border-radius: var(--radius-md);
    outline: none;
    cursor: pointer;
    min-width: 40px;
    height: 40px;
    padding: 0px 12px;
    font-weight: var(--font-weight-semibold);
    font-size: var(--size-16);

    &::-moz-focus-inner {
      border: 0;
    }

    &_small {
      height: 28px;
      padding: 0px 8px;
      font-weight: var(--font-weight-semibold);
      font-size: var(--size-14);
    }

    &_normal {
      min-width: 40px;
      height: 40px;
      padding: 0px 12px;
      font-weight: var(--font-weight-semibold);
      font-size: var(--size-16);
    }

    &_color {
      &_white {
        color: var(--color-btn-white);
        fill: var(--color-btn-white);
        stroke: var(--color-btn-white);
        background-color: var(--color-text-black);
        border: 1px solid transparent;
      }
      &_black {
        color: var(--color-text-black);
        fill: var(--color-text-black);
        stroke: var(--color-text-black);
        background-color: var(--color-btn-white);
        border-color: transparent;
      }
      &_red {
        color: var(--color-btn-red);
        background-color: var(--color-btn-bgc-red);
        border: var(--color-btn-red);
      }
      &_yellow {
        color: var(--color-btn-yellow);
        background-color: var(--color-btn-yellow);
        border: var(--color-btn-red);
      }
      &_orange {
        color: var(--color-btn-orange);
        background-color: var(--color-btn-orange);
        border: var(--color-btn-orange);
      }
      &_blue {
        color: var(--color-btn-blue);
        background-color: var(--color-btn-blue);
        border: var(--color-btn-blue);
      }
      &_purple {
        color: var(--color-btn-purple);
        background-color: var(--color-btn-purple);
        border: solid var(--color-btn-purple);
      }
      &_gray {
        color: var(--color-btn-gray);
        background-color: var(--color-btn-gray);
        border: solid var(--color-btn-gray);
      }
    }

    &_plain {
      background-color: transparent;
      border-color: none;
    }

    &_outline {
      background-color: transparent;
    }
  }
</style>
