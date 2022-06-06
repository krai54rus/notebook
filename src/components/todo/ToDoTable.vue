<template>
  <div class="todo-table">
    <div class="table__title">
      <span>Заголовок таблицы</span>
    </div>
  </div>
</template>

<style lang="scss">
  $component: todo-table;

  .#{$component} {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
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
