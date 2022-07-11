<script lang="ts" setup>
  import { ref } from 'vue'
  interface Props {
    text: string
    color: string
    size: string
    disabled: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    text: '',
    color: 'white',
    size: 'normal',
    disabled: false,
  })

  const emit = defineEmits(['click'])
  const handleClick = params => {
    emit('click', params)
  }

  let buttonColor = props.color

  //   const emit = defineEmits<{
  //   (e: 'change', id: number): void
  //   (e: 'update', value: string): void
  // }>()
</script>
<template>
  <div
    class="n-flex n-justify-center n-align-center"
    :class="[$style['button'], $style[`button_${size}`]]"
    @click="handleClick()"
  >
    <slot name="before-text"></slot>
    <div class="n-flex" :class="$style['button__text']">
      <span>{{ text }}</span>
    </div>
    <slot name="after-text"></slot>
  </div>
</template>

<!-- <script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'NButton',
  props: {
    // activeClass: {
    //   type: String,
    //   default (): string | undefined {
    //     if (!this.btnToggle) return ''

    //     return this.btnToggle.activeClass
    //   },
    // } as any as PropValidator<string>,
    // block: Boolean,
    // depressed: Boolean,
    // fab: Boolean,
    // icon: Boolean,
    // loading: Boolean,
    // outlined: Boolean,
    // plain: Boolean,
    // retainFocusOnClick: Boolean,
    // rounded: Boolean,
    // tag: {
    //   type: String,
    //   default: 'button',
    // },
    // text: Boolean,
    // tile: Boolean,
    // type: {
    //   type: String,
    //   default: 'button',
    // },
    // value: null as any as PropType<any>,
  },

  data: () => ({
    proxyClass: 'v-btn--active',
  }),

  methods: {
    click (e: MouseEvent): void {
      // TODO: Remove this in v3
      this.$emit('click', e)
    },
  },
})
</script> -->

<style lang="scss" module>
  $component: button;

  .#{$component} {
    border-radius: var(--radius-md);
    cursor: pointer;
    background-color: v-bind(buttonColor);
    min-width: 40px;
    height: 40px;
    padding: 0px 12px;
    font-weight: var(--font-weight-semibold);
    font-size: var(--size-16);

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
  }
</style>
