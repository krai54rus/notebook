<script lang="ts" setup>
  import Toolbar from '@/components/generic/Toolbar.vue'
</script>

<template>
  <div :class="$style['todo-table__wrapper']">
    <Toolbar title="ToDo Page"></Toolbar>
    <div :class="$style['todo-table__content']">
      <div
        class="n-p-8"
        :class="[$style['todo-table__column'], $style['table-column']]"
      >
        <div :class="$style['table-column__head']">
          <div>
            <span>1-ая колонка</span>
          </div>
          <div>...</div>
        </div>
        <div :class="$style['table-column__content']">
          <div
            class="n-flex n-flex-column"
            :class="$style['table-column__list']"
          >
            <div
              class="n-flex n-justify-start n-p-4 n-radius-full-sm"
              :class="$style['table-column__item']"
            >
              Название элемента 1
            </div>
          </div>
        </div>
        <div :class="$style['table-column__footer']">
          <div>
            <span>Добавить карточку</span>
          </div>
        </div>
      </div>
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

    .table-column {
      width: 300px;
      &__item {
        background-color: var(--color-white);
      }
    }
  }
</style>
