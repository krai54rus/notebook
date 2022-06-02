<script setup lang="ts">
  import WidgetItem from './WidgetItem.vue'
  defineProps<{
    title?: string
    items?: any[]
  }>()
</script>
<template>
  <div class="widget-container">
    <div class="widget-container__title">
      <h2>{{ title }}</h2>
    </div>
    <div class="widget-container__tabs tabs-list">
      <div class="tabs-item">
        <span>Tab1</span>
      </div>
    </div>
    <div class="widget-container__list widget-list">
      <div class="widget-list__wrapper">
        <WidgetItem v-for="(item, index) in items">
          <template #item="item">
            <slot name="item" :item="item"></slot>
          </template>
        </WidgetItem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    padding: 16px;

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
      overflow: hidden;
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
