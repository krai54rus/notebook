<script lang="ts" setup>
  import ToDoTableColumn from './ToDoTableColumn.vue'
  import plusSvg from '@/assets/icons/plus.svg?raw'

  const addCard = () => {
    console.log('addCard')
  }
</script>

<template>
  <div :class="$style['todo-table__wrapper']">
    <nb-toolbar title="ToDo Page"></nb-toolbar>
    <div class="n-pl-16 n-pt-16" :class="$style['todo-table__content']">
      <ToDoTableColumn></ToDoTableColumn>
      <ToDoTableColumn></ToDoTableColumn>
    </div>
    <div :class="$style['todo-table__sidebar']"></div>
  </div>
</template>

<style lang="scss" module>
  $component: todo-table;

  .#{$component} {
    &__wrapper {
      background-color: var(--color-white);
      height: 100%;
    }

    &__content {
      .table-column {
        background-color: var(--gray95);
        width: 300px;
        &__head {
          width: 100%;
        }
        &__title {
          color: var(--color-text-black);
          font-size: var(--size-14);
          font-weight: var(--font-weight-semibold);
        }
        &__item {
          background-color: var(--color-white);
        }
        &__plus {
          &:before {
            content: '\e901';
          }
        }
      }
    }
  }
</style>
