<template>
  <div :class="$style['toolbar']">
    <div :class="$style['toolbar__title']">
      <slot name="caption">
        <h1>ToDo</h1>
      </slot>
    </div>
    <div :class="$style['tabs']">
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
    height: 200px;
    background-color: #ebecef;
    padding: 16px;
  }
</style>
