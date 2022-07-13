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
      [$style[`color-${color}`]]: true,
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
    // color: $color;
    // background: lighten($color, 25%);
    color: $color-btn-white;
    fill: $color-btn-white;
    // @if $color-text != 0 {
    color: $color;
    fill: $color;
    // }
    background: $color;
    border-color: $color;
  }

  @mixin hover($color, $color-text: 0) {
    &:not(.#{$component}_disabled):hover {
      $hovered-color: darken($color, 15%);
      @if $color-text != 0 {
        color: $color-text;
        fill: $color-text;
      }
      background: $hovered-color;
      border-color: $hovered-color;
    }
  }

  // @mixin order($args...) {
  //   // @for $i from 0 to length($selectors) {
  //   // #{nth($selectors, $i + 1)} {
  //   //   position: absolute;
  //   //   height: $height;
  //   //   margin-top: $i * $height;
  //   // }
  //   @each $color in $args {
  //     . {
  //       color: $color;
  //     }
  //   }
  //   // }
  // }
  $colors: 'white', 'black', 'green', 'blue', 'gray';
  @each $color in $colors {
    .color-#{$color} {
      color: $color;
    }
  }

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
    transition: 0.5s;

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

    // &_color {
    $colors: 'white', 'black', 'green', 'blue', 'gray';
    @each $color in $colors {
      .color-#{$color} {
        color: $color;
      }
    }
    // @include order('white', 'black', 'green', 'blue', 'gray');
    // &_white {
    //   @include color($color-btn-white);
    //   @include hover($color-btn-white);
    //   // background-color: var(--color-text-black);
    // }
    // &_black {
    //   @include color($color-btn-black, $color-btn-black);
    //   @include hover($color-btn-black, $color-btn-white);
    //   // background-color: var(--color-btn-white);
    // }
    // &_red {
    //   @include color($color-btn-red);
    //   @include hover($color-btn-red);
    // }
    // &_green {
    //   @include color($color-btn-green);
    //   @include hover($color-btn-green);
    // }
    // &_yellow {
    //   @include color($color-btn-yellow);
    //   @include hover($color-btn-yellow);
    // }
    // &_orange {
    //   @include color($color-btn-orange);
    //   @include hover($color-btn-orange);
    // }
    // &_blue {
    //   @include color($color-btn-blue);
    //   @include hover($color-btn-blue);
    // }
    // &_purple {
    //   @include color($color-btn-purple);
    //   @include hover($color-btn-purple);
    // }
    // &_gray {
    //   @include color($color-btn-gray, $color-btn-gray);
    //   @include hover($color-btn-gray--light);
    // }
    // }

    &_plain {
      background-color: transparent;
      border-color: transparent;
    }

    &_outline {
      background-color: transparent;
    }
  }
</style>
