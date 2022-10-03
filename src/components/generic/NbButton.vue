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
  const handleClick = () => {
    emit('click')
  }

  //   const emit = defineEmits<{
  //   (e: 'change', id: number): void
  //   (e: 'update', value: string): void
  // }>()
</script>
<template>
  <div
    class="n-flex n-justify-center n-align-center n-wp-100"
    :class="{
      [$style['green']]: true,
      [$style['button']]: true,
      [$style[`button_${size}`]]: true,
      [$style[`button_color-${color}`]]: true,
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
  @import '@/scss/variables/colorsVars';
  $component: button;

  @mixin color($color, $color-text: 0) {
    &:not(.#{$component}_disabled, .#{$component}_outline, .#{$component}_plain) {
      color: $color-white-main;
      fill: $color-white-main;
      @if $color-text != 0 {
        color: $color;
        fill: $color;
      }
      background: $color;
      border-color: $color;
    }

    &.#{$component}_outline {
      color: $color;
      fill: $color;
      background: transparent;
      border-color: $color;
    }

    &.#{$component}_plain {
      color: $color;
      fill: $color;
      background: transparent;
      border-color: transparent;
    }
  }

  @mixin hover($color, $color-text: 0) {
    $hovered-color-darken: darken($color, 10%);
    $hovered-color-lighten: lighten($color, 25%);
    &:not(.#{$component}_disabled, .#{$component}_outline, .#{$component}_plain):hover {
      @if $color-text != 0 {
        color: $color-text;
        fill: $color-text;
      }
      background: $hovered-color-darken;
      border-color: $hovered-color-darken;
    }

    &.#{$component}_outline:hover {
      background: $hovered-color-lighten;
      border-color: $hovered-color-lighten;
    }

    &.#{$component}_plain:hover {
      background: $hovered-color-lighten;
      border-color: $hovered-color-lighten;
    }
  }

  $colors: (
    'white': $color-white-main,
    'black': $color-black-main,
    'green': $color-green-main,
    'red': $color-red-main,
    'blue': $color-blue-main,
    'yellow': $color-yellow-main,
    'orange': $color-orange-main,
    'purple': $color-purple-main,
    'gray': $color-gray-main,
  );

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
    transition: 0.5s;

    &::-moz-focus-inner {
      border: 0;
    }

    &_small {
      height: 28px;
      padding: 0px 8px;
      font-size: var(--size-14);
    }

    &_normal {
      min-width: 40px;
      height: 40px;
      padding: 0px 12px;
      font-size: var(--size-16);
    }

    // !-- Colors part --!
    @each $name, $color in $colors {
      &_color-#{$name} {
        @include color($color);
        @include hover($color);
      }
    }

    &_plain {
      background-color: transparent;
      border-color: transparent;
    }

    &_outline {
      background-color: transparent;
    }
  }
</style>
