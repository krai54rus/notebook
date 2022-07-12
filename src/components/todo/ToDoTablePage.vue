<script lang="ts" setup>
  import Toolbar from '@/components/generic/Toolbar.vue'
  import Button from '@/components/generic/Button.vue'

  const addCard = () => {
    console.log('addCard')
  }
</script>

<template>
  <div :class="$style['todo-table__wrapper']">
    <Toolbar title="ToDo Page"></Toolbar>
    <div class="n-pl-16 n-pt-16" :class="$style['todo-table__content']">
      <div class="n-p-8 n-radius--full-sm" :class="$style['table-column']">
        <div
          class="n-mb-8 n-flex n-justify-space-between"
          :class="$style['table-column__head']"
        >
          <div :class="$style['table-column__title']">
            <span>Column one</span>
          </div>
          <div>...</div>
        </div>
        <div :class="$style['table-column__content']">
          <div
            class="n-flex n-flex-column"
            :class="$style['table-column__list']"
          >
            <div
              class="n-flex n-justify-start n-p-4 n-radius--full-sm"
              :class="$style['table-column__item']"
            >
              Название элемента 1
            </div>
          </div>
        </div>
        <div class="n-mt-8" :class="$style['table-column__footer']">
          <div>
            <Button
              text="Добавить карточку"
              size="small"
              @click="addCard()"
            ></Button>
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
      }
    }
  }
</style>
