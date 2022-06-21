<script setup lang="ts">
  import WidgetItem from './WidgetItem.vue'
  defineProps<{
    title?: string
    items?: any[]
  }>()
</script>
<template>
  <div class="n-p-16" :class="$style['widget-container']">
    <div :class="$style['widget-container__title']">
      <h2>{{ title }}</h2>
    </div>
    <div :class="[$style['widget-container__tabs'], $style['tabs-list']]">
      <div :class="$style['tabs-item']">
        <span>Tab1</span>
      </div>
    </div>
    <div :class="[$style['widget-container__list'], $style['widget-list']]">
      <div :class="$style['widget-list__wrapper']">
        <WidgetItem v-for="(item, index) in items">
          <template #item="item">
            <slot name="item" :item="item"></slot>
          </template>
        </WidgetItem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: widget-container;

  .#{$component} {
    background-color: var(--white);
    border-radius: 8px;
    -webkit-box-shadow: 1px 2px 6px var(--black-transparent);
    box-shadow: 1px 2px 6pxvar (--black-transparent);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    // padding: 16px;
    overflow: hidden;

    &__title {
      margin-bottom: 10px;
    }

    &__tabs {
      margin-bottom: 10px;
      font-size: 14px;

      .tabs-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }

    .widget-list {
      display: flex;
      width: 100%;
      max-width: 1624px;
      overflow-x: scroll;
      &__wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: space-between;
        padding: 4px;
      }
    }

    &__list {
    }
  }
</style>
