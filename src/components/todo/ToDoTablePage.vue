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
    }

    const dropColumn = store.columns[item.dropColumnIndex]
    const isPlaceholder = dropColumn.items.find(todo => todo.placeholder)

    if (!isPlaceholder) {
      placeHolderItem.value = {
        ...placeHolderItem.value,
        id: placeHolderItem.value.id * 1000,
        placeholder: true,
        column: item.dropColumnId,
        columnIndex: item.dropColumnIndex,
      }
      if (item.name === 'column') {
        console.log('placeHolderItem ', placeHolderItem.value)
        dropColumn.items.push(placeHolderItem.value)
      } else {
        // const dropElem = {
        //   ...dropColumn.items[item.dropItemIndex],
        // }
      }
    } else {
      // if (dropColumn.items[dropColumn.items.length - 1].placeholder) {
      //   console.log('have')
      // } else {
      //   currItem.id = currItem.id * 1000
      //   currItem.placeholder = true
      //   dropColumn.items.push(currItem)
      // }
    }

    // if (
    //   dropColumn.items[item.itemIndex + 1] &&
    //   dropColumn.items[item.itemIndex + 1].placeholder
    // ) {
    // } else {
    //   currItem.id = currItem.id * 1000
    //   currItem.placeholder = true
    //   dropColumn.items.splice(item.itemIndex, 0, currItem)
    // }
    // console.log('dropElem ', dropElem)
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
    // const currItem = {
    //   ...store.columns[item.currColumnIndex].items.find(
    //     todoItem => todoItem.id === item.currItemId
    //   ),
    // }
    const dropColumn = store.columns[item.dropColumnIndex]
    // const dropElem = {
    //   ...dropColumn.items[item.itemIndex],
    // }

    // console.log(store.columns[item.columnIndex].items)

    store.columns[item.dropColumnIndex].items = dropColumn.items.filter(
      todo => !todo.placeholder
    )

    // if (dropColumn.items[dropColumn.items.length - 1].placeholder) {
    //   dropColumn.items.pop()
    // }
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
