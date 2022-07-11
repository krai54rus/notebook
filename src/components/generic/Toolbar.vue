<script lang="ts" setup>
  import { ref } from 'vue'
  interface Props {
    title: string
    height: string
    items?: any[]
  }

  const props = withDefaults(defineProps<Props>(), {
    title: 'Title',
    height: 'auto',
    items: () => ['one', 'two'],
  })

  const toolbarHeight = props.height
</script>
<template>
  <div class="n-p-8" :class="$style['toolbar']">
    <div :class="$style['toolbar__title']">
      <slot name="caption">
        <h3>{{ title }}</h3>
      </slot>
    </div>
    <div>
      <slot name="content"></slot>
    </div>
    <div v-if="false" :class="$style['tabs']">
      <div :class="$style['tabs__list']">
        <div :class="$style['tabs__item']">
          <span>Tab1</span>
        </div>
        <div :class="$style['tabs__item']">
          <span>Tab1</span>
        </div>
        <div :class="$style['tabs__item']">
          <span>Tab1</span>
        </div>
        <div :class="$style['tabs__item']">
          <span>Tab1</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: toolbar;

  .#{$component} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: v-bind(toolbarHeight);
    background-color: #ebecef;
    padding: 16px;
  }
</style>
