<script lang="ts" setup>
  import { useToDoStore } from '@/pinia/todo'
  import { ref, computed, onMounted, nextTick } from 'vue'
  import TodoTableColumn from './TodoTableColumn.vue'
  import TodoTableColumnItem from './TodoTableColumnItem.vue'
  import ModalTodoItem from './ModalTodoItem.vue'
  import plusSvg from '@/assets/icons/plus.svg?raw'

  const store = useToDoStore()
  const columns = computed(() => store.columns)
  store.loadColumns()

  const placeHolderItem = ref(null)
  let dragging = ref(false)
  let mouseMove = ref(false)
  let isModalTodoItem = ref(false)
  const itemInfo = ref(null)
  const currTodoEl = ref(null)
  const currTodoItem = ref(null)
  const currentDroppable = ref(null)
  const startCoords = ref({ x: 0, y: 0 })
  const indent = ref({ x: 0, y: 0 })

  onMounted(() => {
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', dragStop)
  })

  const dragStart = ({ e, item, index, elem, columnIndex }) => {
    e.preventDefault()
    if (elem) {
      dragging.value = true
      currTodoEl.value = elem
      currTodoItem.value = {
        ...item,
        columnIndex,
        index,
      }
      const coordsElem = elem.getBoundingClientRect()
      startCoords.value.x = e.clientX
      startCoords.value.y = e.clientY
      indent.value.x = e.clientX - coordsElem.left
      indent.value.y = e.clientY - coordsElem.top
      columns.value[columnIndex].items[index].moving = true
    }
  }

  const onDrag = event => {
    if (dragging.value) {
      mouseMove.value = true
      elemMoving(event)
      intersectObs(event)
    }
  }

  const clickItemUp = ({ e, item, index, elem, columnIndex }) => {
    if (mouseMove.value) {
      // console.log('clickItemUp mouseMove ', mouseMove.value)
      dragStop(e)
    } else {
      itemInfo.value = item
      isModalTodoItem.value = true
      // console.log('click Item up')
    }
  }

  const elemMoving = event => {
    const { clientX, clientY } = event.changedTouches
      ? event.changedTouches[0]
      : event
    const coordsElem = currTodoEl.value.getBoundingClientRect()
    currTodoEl.value.style.top = `${clientY - indent.value.y}px`
    currTodoEl.value.style.left = `${clientX - indent.value.x}px`
  }

  const intersectObs = event => {
    currTodoEl.value.style.display = 'none'
    // Делаем невидимым элемент, чтобы узнать какой элемент находится под курсором
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
    currTodoEl.value.style.position = 'absolute'
    currTodoEl.value.style.zIndex = '1000'
    currTodoEl.value.style.display = 'flex'

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
          dropColumnId: +currentDroppable.value.dataset.columnid,
          dropColumnIndex: +currentDroppable.value.dataset.columnindex,
        })
      }
      currentDroppable.value = droppableArea
      // логика обработки процесса, когда мы "влетаем" в элемент droppable
      if (currentDroppable.value) {
        // Пересечение с элементом
        if (droppableArea && droppableElem) {
          addItem({
            dropItemId: +droppableElem.dataset.itemid,
            dropItemIndex: +droppableElem.dataset.itemindex,
            dropColumnId: +droppableArea.dataset.columnid,
            dropColumnIndex: +droppableArea.dataset.columnindex,
            currColumnId: +currTodoItem.value.column,
            currColumnIndex: +currTodoItem.value.columnIndex,
            currItemId: +currTodoItem.value.id,
            currItemIndex: +currTodoEl.value.dataset.itemindex,
          })
        }
        // Пересечение только с таблицей
        if (droppableArea && droppableElem === null) {
          addItem({
            dropColumnId: +droppableArea.dataset.columnid,
            dropColumnIndex: +droppableArea.dataset.columnindex,
            currColumnId: +currTodoItem.value.column,
            currColumnIndex: +currTodoItem.value.columnIndex,
            currItemId: +currTodoItem.value.id,
            currItemIndex: +currTodoEl.value.dataset.itemindex,
            name: 'column',
          })
        }
      }
    } else {
      if (droppableArea) {
        currentDroppable.value = droppableArea
        // Пересечение с элементом
        if (droppableElem) {
          addItem({
            dropItemId: +droppableElem.dataset.itemid,
            dropItemIndex: +droppableElem.dataset.itemindex,
            dropColumnId: +droppableArea.dataset.columnid,
            dropColumnIndex: +droppableArea.dataset.columnindex,
            currColumnId: +currTodoItem.value.column,
            currColumnIndex: +currTodoItem.value.columnIndex,
            currItemId: +currTodoItem.value.id,
            currItemIndex: +currTodoEl.value.dataset.itemindex,
          })
        }
      }
    }
  }

  const dragStop = e => {
    let isMoved = mouseMove.value
    //Очистка всех значений до первоначальных
    dragging.value = false
    mouseMove.value = false

    if (isMoved && currTodoEl.value && currTodoItem.value) {
      if (
        columns.value[currTodoItem.value.columnIndex].items[
          currTodoEl.value.dataset.itemindex
        ]
      ) {
        columns.value[currTodoItem.value.columnIndex].items[
          currTodoEl.value.dataset.itemindex
        ].moving = false
      }
      currTodoEl.value.style.top = `auto`
      currTodoEl.value.style.left = `auto`
      currTodoEl.value.style.position = 'relative'
      currTodoEl.value.style.display = 'flex'
      currTodoEl.value.style.zIndex = '10'
      saveItem({
        itemId: +currTodoItem.value.id,
        itemIndex: +currTodoItem.value.index,
        columnId: +currTodoItem.value.column,
        columnIndex: +currTodoItem.value.columnIndex,
      })
    }

    currTodoEl.value = null
    currTodoItem.value = null
    startCoords.value.x = 0
    startCoords.value.y = 0
    indent.value.x = 0
    indent.value.y = 0
  }

  const addItem = item => {
    placeHolderItem.value = {
      ...columns.value[item.currColumnIndex].items.find(
        todoItem => todoItem.id === item.currItemId
      ),
      placeholder: true,
    }

    if (!placeHolderItem.value) {
      return
    }

    const dropColumn = columns.value[item.dropColumnIndex]
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

        dropColumn.items.splice(item.dropItemIndex, 0, placeHolderItem.value)
      }
    } else {
      if (
        !dropColumn.items[item.dropItemIndex] ||
        !dropColumn.items[item.dropItemIndex].placeholder
      ) {
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

    let newEl = {
      ...item,
      id: item.itemId,
    }

    if (phItem) {
      // replace placeholder item on current drag item, delete old position
      newEl = {
        ...phItem,
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
      delete newEl.placeholder
      delete newEl.moving

      store.columns[phItem.columnIndex].items[plIndex] = { ...newEl }
      nextTick(() => {
        store.columns[item.columnIndex].items.splice(indexItem, 1)
      })
    } else {
      // return to initial position
      const findItem = store.columns[newEl.columnIndex].items.find(
        el => el.id === newEl.itemId
      )
      store.columns[newEl.columnIndex].items[item.itemIndex] = findItem
    }
    placeHolderItem.value = null
    currentDroppable.value = null
  }

  const deletePlaceholder = item => {
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
          <TodoTableColumnItem
            v-for="(item, itemI) in column.items"
            :key="item.id"
            :item="item"
            :index="itemI"
            :column-index="columnI"
            @drag-start="dragStart($event)"
            @click="clickItemUp($event)"
          >
            {{ item.id }}
          </TodoTableColumnItem>
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
