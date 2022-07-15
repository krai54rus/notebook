<script lang="ts" setup>
  import plusSvg from '@/assets/icons/plus.svg?raw'
  import ToDoColumnModel from '@/entities/todo/ToDoColumnModel'

  interface Props {
    column: IToDoColumn[]
  }

  const props = withDefaults(defineProps<Props>(), {
    column: ToDoColumnModel.create(),
  })

  const addCard = () => {
    console.log('addCard')
  }
</script>

<template>
  <div class="n-mr-8" :class="$style['table-column__wrapper']">
    <div
      class="n-p-8 n-flex n-flex-column n-radius--full-sm"
      :class="$style['table-column__content']"
    >
      <div
        class="n-mb-8 n-flex n-justify-space-between"
        :class="$style['table-column__head']"
      >
        <div :class="$style['table-column__title']">
          <span>{{ column.title }}</span>
        </div>
        <div>...</div>
      </div>
      <div :class="$style['table-column__content']">
        <div class="n-flex n-flex-column" :class="$style['table-column__list']">
          <div
            v-for="item in column.items"
            :key="item.id"
            class="n-p-4 n-mb-8 n-flex n-justify-start n-radius--full-sm"
            :class="$style['table-column__item']"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
      <div class="n-mt-8" :class="$style['table-column__footer']">
        <div :class="$style['table-column__add-button']">
          <nb-button
            text="Добавить карточку"
            size="small"
            color="green"
            @click="addCard()"
          >
            <template #before-text>
              <div v-html="plusSvg" />
            </template>
          </nb-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: table-column;

  .#{$component} {
    &__wrapper {
      width: 300px;
      display: inline-block;
      height: 100%;
      vertical-align: top;
      white-space: nowrap;
    }

    &__content {
      background-color: var(--gray95);
      box-sizing: border-box;
      max-height: 100%;
      position: relative;
      white-space: normal;
      width: 100% !important;
    }

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
      box-shadow: 0 1px 0 #091e4240;
      cursor: pointer;

      &:hover {
        background-color: var(--color-white-hovered);
      }
    }
    &__plus {
      &:before {
        content: '\e901';
      }
    }
  }
</style>
