<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import plusSvg from '@/assets/icons/plus_24.svg?raw'
  import ToDoColumnModel from '@/entities/todo/ToDoColumnModel'

  interface Props {
    column: IToDoColumn
    index: number
  }

  const props = withDefaults(defineProps<Props>(), {
    column: ToDoColumnModel.create(),
    index: 0,
  })
</script>

<template>
  <div
    class="n-mr-8 table-column__drop-area"
    :class="[$style['table-column__wrapper']]"
    :data-columnid="column.id"
    :data-columnindex="index"
  >
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
          <slot name="content" />
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
      // position: relative;
      white-space: normal;
      width: 100% !important;

      .placeholder {
        background-color: var(--gainsboro);
        height: 24px;
      }
    }

    &__head {
      width: 100%;
    }
    &__title {
      color: var(--color-text-black);
      font-size: var(--size-14);
      font-weight: var(--font-weight-semibold);
    }
  }
</style>
