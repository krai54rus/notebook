<template>
  <div class="toolbar">
    <div class="toolbar__title">
      <slot name="caption">
        <h1>ToDo</h1>
      </slot>
    </div>
    <div class="tabs">
      <div class="tabs__list">
        <div class="tabs__item">
          <span>Tab1</span>
        </div>
        <div class="tabs__item">
          <span>Tab2</span>
        </div>
        <div class="tabs__item">
          <span>Tab3</span>
        </div>
        <div class="tabs__item">
          <span>Tab4</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
