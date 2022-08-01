<script lang="ts" setup>
  import { useToDoStore } from '@/pinia/todo'
  import { ref, computed } from 'vue'
  import ToDoTableColumn from './ToDoTableColumn.vue'
  import plusSvg from '@/assets/icons/plus.svg?raw'

  const store = useToDoStore()
  const items = computed(() => store.columns)
  store.loadColumns()

  const placeHolderItem = ref(null)

  const addItem = item => {
    placeHolderItem.value = {
      ...store.columns[item.currColumnIndex].items.find(
        todoItem => todoItem.id === item.currItemId
      ),
      placeholder: true,
    }

    if (!placeHolderItem.value) {
      return
    }

    const dropColumn = store.columns[item.dropColumnIndex]
    const isPlaceholder = dropColumn.items.find(todo => todo.placeholder)

    if (!isPlaceholder) {
      placeHolderItem.value = {
        ...placeHolderItem.value,
        id: placeHolderItem.value.id * 1000,
        column: item.dropColumnId,
        columnIndex: item.dropColumnIndex,
      }
      if (item.name === 'column') {
        dropColumn.items.push(placeHolderItem.value)
      } else {
        const dropElem = {
          ...dropColumn.items[item.dropItemIndex],
        }

        placeHolderItem.value = {
          ...placeHolderItem.value,
          id: placeHolderItem.value.id * 1000,
          column: item.dropColumnId,
          columnIndex: item.dropColumnIndex,
        }

        console.log('placeHolderItem.value splice', placeHolderItem.value)

        dropColumn.items.splice(item.dropItemIndex, 0, placeHolderItem.value)
      }
    } else {
      if (
        dropColumn.items[item.dropItemIndex] &&
        dropColumn.items[item.dropItemIndex].placeholder
      ) {
        console.log('нижний элемент - placeholder')
      } else {
        store.columns[item.dropColumnIndex].items = dropColumn.items.filter(
          todo => !todo.placeholder
        )

        placeHolderItem.value = {
          ...placeHolderItem.value,
          id: placeHolderItem.value.id * 1000,
          placeholder: true,
          column: item.dropColumnId,
          columnIndex: item.dropColumnIndex,
        }

        dropColumn.items.splice(item.dropItemIndex, 0, placeHolderItem.value)
      }
    }
  }

  const saveItem = item => {
    const phItem = placeHolderItem.value
    if (phItem) {
      const newEl = {
        ...phItem,
        id: item.itemId,
        placeholder: false,
        moving: false,
      }

      const index = store.columns[phItem.columnIndex].items.findIndex(
        el => el.id === phItem.id
      )
      delete newEl.columnIndex
      store.columns[phItem.columnIndex].items[index] = newEl
      store.columns[item.columnIndex].items.splice(item.itemIndex, 1)
    }
    placeHolderItem.value = null
  }

  const deleteItem = item => {
    const dropColumn = store.columns[item.dropColumnIndex]

    store.columns[item.dropColumnIndex].items = dropColumn.items.filter(
      todo => !todo.placeholder
    )
  }
</script>

<template>
  <div :class="$style['todo-table__wrapper']">
    <nb-toolbar title="ToDo Page"></nb-toolbar>
    <div
      class="n-pl-16 n-pt-16 n-flex n-justify-start n-align-top n-wp-100 n-hp-100"
      :class="$style['todo-table__content']"
    >
      <ToDoTableColumn
        v-for="(item, index) in items"
        :key="item.id"
        :column-index="index"
        :column="item"
        @delete-item="deleteItem($event)"
        @add-item="addItem($event)"
        @save-item="saveItem($event)"
      />
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
