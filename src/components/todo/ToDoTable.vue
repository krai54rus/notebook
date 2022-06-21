<template>
  <div
    class="n-flex n-justify-center n-align-center"
    :class="$style['todo-table']"
  >
    <div :class="$style['table__title']">
      <span>Заголовок таблицы</span>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: todo-table;

  .#{$component} {
    width: 200px;
    height: 100px;
    background-color: var(--color-blue-main);
    padding: 10px;
    border-radius: 3px;

    .table {
      &__title {
        color: var(--color-white);
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
</style>
