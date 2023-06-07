<script lang="ts" setup>
  import { useToDoStore } from '@/pinia/todo'
  import { ref, computed, onMounted, nextTick } from 'vue'
  import TodoTableColumn from './TodoTableColumn.vue'
  import TodoTableColumnItem from './TodoTableColumnItem.vue'
  import NbDnDItem from '@/components/generic/NbDnDItem.vue'
  import ModalTodoItem from './ModalTodoItem.vue'
  import plusSvg from '@/assets/icons/plus.svg?raw'
  import { ITodoItem } from '@/entities/todo/TodoColumnTypes'

  interface ITodoDragItem {
    // column?: number
    // columnIndex?: number
    // index?: number
    item: ITodoItem
    index: number
    columnIndex: number
    elem?: any
    placeholder?: boolean
  }

  const store = useToDoStore()
  const columns = computed(() => store.columns)
  store.loadColumns()

  const placeHolderItem = ref<ITodoDragItem | null>(null)
  let dragging = ref(false)
  let mouseMove = ref(false)
  let isModalTodoItem = ref(false)
  const itemInfo = ref(null)
  const currTodoEl = ref<HTMLDivElement | null>(null)
  const currTodoItem = ref<ITodoDragItem | null>(null)
  const currentDroppable = ref<Element | null>(null)
  const startCoords = ref({ x: 0, y: 0 })
  const indent = ref({ x: 0, y: 0 })

  onMounted(() => {
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', dragStop)
  })

  const dragStart = ({
    e,
    dragItem,
  }: {
    e: DragEvent
    dragItem: ITodoDragItem
  }) => {
    e.preventDefault()

    console.log('dragevent ', e)
    console.log('dragItem ', dragItem)
    if (dragItem && dragItem.elem) {
      dragging.value = true
      currTodoEl.value = dragItem.elem
      currTodoItem.value = {
        item: dragItem.item,
        columnIndex: dragItem.columnIndex,
        index: dragItem.index,
      }
      const coordsElem = dragItem.elem.getBoundingClientRect()
      startCoords.value.x = e.clientX
      startCoords.value.y = e.clientY
      indent.value.x = e.clientX - coordsElem.left
      indent.value.y = e.clientY - coordsElem.top
      // columns.value[columnIndex].items[index].moving = true
    }
  }

  const onDrag = (event: any) => {
    if (dragging.value) {
      mouseMove.value = true
      elemMoving(event)
      intersectObs(event)
    }
  }

  const clickItemUp = ({ item }: any) => {
    if (mouseMove.value) {
      // console.log('clickItemUp mouseMove ', mouseMove.value)
      dragStop()
    } else {
      itemInfo.value = item
      isModalTodoItem.value = true
      // console.log('click Item up')
    }
  }

  const elemMoving = (event: any) => {
    const { clientX, clientY } = event.changedTouches
      ? event.changedTouches[0]
      : event

    if (currTodoEl.value) {
      const coordsElem = currTodoEl.value.getBoundingClientRect()
      currTodoEl.value.style.top = `${clientY - indent.value.y}px`
      currTodoEl.value.style.left = `${clientX - indent.value.x}px`
    }
  }

  const intersectObs = (event: any) => {
    let elemBelow = null

    if (currTodoEl.value) {
      currTodoEl.value.style.display = 'none'
      // Делаем невидимым элемент, чтобы узнать какой элемент находится под курсором
      elemBelow = document.elementFromPoint(event.clientX, event.clientY)
      currTodoEl.value.style.position = 'absolute'
      currTodoEl.value.style.zIndex = '1000'
      currTodoEl.value.style.display = 'flex'
    }

    if (!elemBelow) return

    // ближайшие контейнер и элемент
    let droppableArea = elemBelow.closest('.table-column__drop-area')
    let droppableElem = elemBelow.closest('.column-drop-item')

    if (currentDroppable.value != droppableArea) {
      // мы либо залетаем на цель, либо улетаем из неё
      // внимание: оба значения могут быть null
      //   currentDroppable=null,
      //     если мы были не над droppable до этого события (например, над пустым пространством)
      //   droppableArea=null,
      //     если мы не над droppable именно сейчас, во время этого события

      if (currentDroppable.value) {
        // логика обработки процесса "вылета" из droppable (удаляем подсветку)
        deletePlaceholder({
          // @ts-ignore
          dropColumnId: +currentDroppable.value.dataset.columnid,
          // @ts-ignore
          dropColumnIndex: +currentDroppable.value.dataset.columnindex,
        })
      }
      currentDroppable.value = droppableArea
      // логика обработки процесса, когда мы "влетаем" в элемент droppable
      if (currentDroppable.value) {
        // Пересечение с элементом
        if (droppableArea && droppableElem && currTodoItem.value) {
          addItem({
            droppableElem,
            droppableArea,
            // dropColumnId: +droppableArea.dataset.columnid,
            // dropColumnIndex: +droppableArea.dataset.columnindex,
            // currColumnId: +currTodoItem.value.column,
            // currColumnIndex: +currTodoItem.value.columnIndex,
            // currItemId: +currTodoItem.value.id,
            // currItemIndex: +currTodoEl.value?.dataset?.itemindex,
          })
        }
        // Пересечение только с таблицей
        if (droppableArea && droppableElem === null) {
          addItem({
            droppableArea,
            // dropColumnId: +droppableArea.dataset.columnid,
            // dropColumnIndex: +droppableArea.dataset.columnindex,
            // currColumnId: +currTodoItem.value.column,
            // currColumnIndex: +currTodoItem.value.columnIndex,
            // currItemId: +currTodoItem.value.id,
            // currItemIndex: +currTodoEl.value.dataset.itemindex,
            dropName: 'column',
          })
        }
      }
    } else {
      if (droppableArea) {
        currentDroppable.value = droppableArea
        // Пересечение с элементом
        if (droppableElem) {
          addItem({
            droppableElem,
            droppableArea,
            // dropItemId: +droppableElem.dataset.itemid,
            // dropItemIndex: +droppableElem.dataset.itemindex,
            // dropColumnId: +droppableArea.dataset.columnid,
            // dropColumnIndex: +droppableArea.dataset.columnindex,
            // currColumnId: +currTodoItem.value.column,
            // currColumnIndex: +currTodoItem.value.columnIndex,
            // currItemId: +currTodoItem.value.id,
            // currItemIndex: +currTodoEl.value.dataset.itemindex,
          })
        }
      }
    }
  }

  const dragStop = () => {
    let isMoved = mouseMove.value
    //Очистка всех значений до первоначальных
    dragging.value = false
    mouseMove.value = false

    if (isMoved && currTodoEl.value && currTodoItem.value) {
      // if (
      //   columns.value[currTodoItem.value.columnIndex].items[
      //     currTodoEl.value.dataset.itemindex
      //   ]
      // ) {
      //   columns.value[currTodoItem.value.columnIndex].items[
      //     currTodoEl.value.dataset.itemindex
      //   ].moving = false
      // }
      currTodoEl.value.style.top = `auto`
      currTodoEl.value.style.left = `auto`
      currTodoEl.value.style.position = 'relative'
      currTodoEl.value.style.display = 'flex'
      currTodoEl.value.style.zIndex = '10'
      saveItem({
        itemId: +currTodoItem.value.item.id,
        itemIndex: +currTodoItem.value?.index,
        columnId: +currTodoItem.value?.item.column,
        columnIndex: +currTodoItem.value?.columnIndex,
      })
    }

    currTodoEl.value = null
    currTodoItem.value = null
    startCoords.value.x = 0
    startCoords.value.y = 0
    indent.value.x = 0
    indent.value.y = 0
  }

  const addItem = (params: {
    droppableElem?: any
    droppableArea?: any
    dropName?: string
  }) => {
    const dropItemId = +params.droppableElem.dataset.itemid
    const dropItemIndex = +params.droppableElem.dataset.itemindex
    const dropColumnId = +params.droppableArea.dataset.columnid
    const dropColumnIndex = +params.droppableArea.dataset.columnindex

    let currColumnId = 0
    let currColumnIndex = 0
    let currItemId = 0

    if (currTodoItem.value) {
      currColumnId = +currTodoItem.value?.item.column
      currColumnIndex = +currTodoItem.value?.columnIndex
      currItemId = +currTodoItem.value?.item.id
    }
    const currItemIndex = currTodoEl.value?.dataset.itemindex

    const finder = columns.value[currColumnIndex].items.find(
      todoItem => +todoItem.id === currItemId
    )

    // if (finder) {
    //   placeHolderItem.value = {
    //     ...finder,
    //     placeholder: true,
    //   }
    // }

    // if (!placeHolderItem.value) {
    if (!finder) {
      return
    }

    const dropColumn = columns.value[dropColumnIndex]
    const isPlaceholder = dropColumn.items.find(todo => todo.placeholder)

    if (!isPlaceholder && finder) {
      placeHolderItem.value = {
        ...finder,
        placeholder: true,
        // @ts-ignore
        id: +finder.id * 1000,
        column: dropColumnId,
        columnIndex: dropColumnIndex,
      }

      // @ts-ignore
      if (dropName && dropName === 'column' && placeHolderItem.value) {
        dropColumn.items.push(placeHolderItem.value.item)
      } else {
        const dropElem = {
          ...dropColumn.items[dropItemIndex],
        }

        placeHolderItem.value = {
          ...finder,
          // @ts-ignore
          id: +finder.id * 1000,
          column: dropColumnId,
          columnIndex: dropColumnIndex,
        }

        if (placeHolderItem.value) {
          dropColumn.items.splice(dropItemIndex, 0, placeHolderItem.value.item)
        }
      }
    } else {
      if (
        !dropColumn.items[dropItemIndex] ||
        !dropColumn.items[dropItemIndex].placeholder
      ) {
        store.columns[dropColumnIndex].items = dropColumn.items.filter(
          todo => !todo.placeholder
        )

        placeHolderItem.value = {
          ...placeHolderItem.value,
          // @ts-ignore
          id: +finder.id * 1000,
          placeholder: true,
          column: dropColumnId,
          columnIndex: dropColumnIndex,
        }

        if (placeHolderItem.value) {
          dropColumn.items.splice(dropItemIndex, 0, placeHolderItem.value.item)
        }
      }
    }
  }

  const saveItem = (item: {
    itemId: any
    itemIndex: any
    columnId?: number
    columnIndex: any
  }) => {
    const phItem = placeHolderItem.value

    let newEl = {
      ...item,
      id: item.itemId,
    }

    if (phItem) {
      // replace placeholder item on current drag item, delete old position
      // @ts-ignore
      newEl = {
        ...phItem.item,
        id: item.itemId,
      }

      const plIndex = store.columns[phItem.columnIndex].items.findIndex(
        el => el.placeholder
      )

      let indexItem = store.columns[phItem.columnIndex].items.findIndex(
        el => el.id === item.itemId
      )

      if (indexItem === -1) {
        indexItem = item.itemIndex
      }

      delete newEl.columnIndex
      // @ts-ignore
      delete newEl.placeholder
      // delete newEl.moving

      // @ts-ignore
      store.columns[phItem.columnIndex].items[plIndex] = { ...newEl }
      nextTick(() => {
        store.columns[item.columnIndex].items.splice(indexItem, 1)
      })
    } else {
      // return to initial position
      const findItem = store.columns[newEl.columnIndex].items.find(
        (el: { id: any }) => el.id === newEl.itemId
      )

      // @ts-ignore
      store.columns[newEl.columnIndex].items[item.itemIndex] = findItem
    }
    placeHolderItem.value = null
    currentDroppable.value = null
  }

  const deletePlaceholder = (item: {
    dropColumnId?: number
    dropColumnIndex: any
  }) => {
    const dropColumn = columns.value[item.dropColumnIndex]

    store.columns[item.dropColumnIndex].items = dropColumn.items.filter(
      todo => !todo.placeholder
    )

    placeHolderItem.value = null
    currentDroppable.value = null
  }

  const closeModal = () => {
    console.log('qwe')
    isModalTodoItem.value = false
  }
</script>

<template>
  <div :class="$style['todo-table__wrapper']">
    <nb-toolbar title="ToDo Page"></nb-toolbar>
    <div
      class="n-pl-16 n-pt-16 n-flex n-justify-start n-align-top n-wp-100 n-hp-100"
      :class="$style['todo-table__content']"
    >
      <TodoTableColumn
        v-for="(column, columnI) in columns"
        :key="column.id"
        :column="column"
        :index="columnI"
        @delete-item="deletePlaceholder($event)"
        @add-item="addItem($event)"
        @save-item="saveItem($event)"
      >
        <template #content>
          <NbDnDItem
            v-for="(item, itemI) in column.items"
            :key="item.id"
            :item="item"
            :index="itemI"
            :column-index="columnI"
            @drag-start="dragStart($event)"
            @click="clickItemUp($event)"
          >
            <TodoTableColumnItem :item="item">
              {{ item.id }}
            </TodoTableColumnItem>
          </NbDnDItem>
        </template>
      </TodoTableColumn>
    </div>
    <div :class="$style['todo-table__sidebar']"></div>
    <ModalTodoItem
      v-if="isModalTodoItem"
      :item="itemInfo"
      @close="isModalTodoItem = false"
    ></ModalTodoItem>
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
          color: var(--color-black-main);
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
