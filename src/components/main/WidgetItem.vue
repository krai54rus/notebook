<script lang="ts" setup></script>
<template>
  <div class="widget-item">
    <slot name="item">
      <div class="widget-item__info">
        <div class="widget-item__title">
          <span>Список дел</span>
        </div>
        <div class="widget-item__content">
          <span
            >Это стартовая заметка для задач. Здесь окажутся задачи, которые вы
            добавите через кнопку «Создать» и не поместите сразу в другую
            заметку.
          </span>
        </div>
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
  $component: widget-item;

  .#{$component} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 258px;
    margin: 0 12px 0 0;
    width: 172px;
    border-radius: 8px;
    padding: 8px;
    box-shadow: var(--box-shadow);

    &__title {
      color: var(--gray20);
      font-size: 14px;
      line-height: 18px;
      font-weight: 600;
    }
  }
</style>
