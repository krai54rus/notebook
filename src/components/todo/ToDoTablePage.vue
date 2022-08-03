<script lang="ts" setup>
  import { useToDoStore } from '@/pinia/todo'
  import { ref, computed, onMounted } from 'vue'
  import ToDoTableColumn from './ToDoTableColumn.vue'
  import ToDoTableColumnItem from './ToDoTableColumnItem.vue'
  import plusSvg from '@/assets/icons/plus.svg?raw'

  const store = useToDoStore()
  const columns = computed(() => store.columns)
  store.loadColumns()

  const placeHolderItem = ref(null)
  let dragging = ref(false)
  let mouseMove = ref(false)
  // const itemsArr = ref([])
  // const itemRefs = { itemsArr }
  const currentTodo = ref(null)
  const currentDroppable = ref(null)
  const startCoords = ref({ x: 0, y: 0 })
  const indent = ref({ x: 0, y: 0 })

  onMounted(() => {
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', dragStop)
  })

  const dragStart = ({ e, item, index, elem }) => {
    e.preventDefault()
    console.log('elem ', elem)
    // const elem = itemRefs.itemsArr.value[index]
    if (elem) {
      dragging.value = true
      currentTodo.value = elem
      const coordsElem = elem.getBoundingClientRect()
      startCoords.value.x = e.clientX
      startCoords.value.y = e.clientY
      indent.value.x = e.clientX - coordsElem.left
      indent.value.y = e.clientY - coordsElem.top
      columns[item.column].items[index].moving = true
    }
  }

  const onDrag = event => {
    if (dragging.value) {
      mouseMove.value = true
      elemMoving(event)
      intersectObs(event)
    }
  }

  const clickItemUp = param => {
    console.log('click Item Up, openModal')
    if (mouseMove.value) {
      dragStop(e)
    } else {
      console.log('click Item Up, openModal')
    }
  }

  const elemMoving = event => {
    const { clientX, clientY } = event.changedTouches
      ? event.changedTouches[0]
      : event
    const coordsElem = currentTodo.value.getBoundingClientRect()
    currentTodo.value.style.top = `${clientY - indent.value.y}px`
    currentTodo.value.style.left = `${clientX - indent.value.x}px`
  }

  const intersectObs = event => {
    currentTodo.value.style.display = 'none'
    // Делаем невидимым элемент, чтобы узнать какой элемент находится под курсором
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
    currentTodo.value.style.position = 'absolute'
    currentTodo.value.style.zIndex = '1000'
    currentTodo.value.style.display = 'flex'

    if (!elemBelow) return

    // потенциальные цели переноса помечены классом droppable (может быть и другая логика)
    let droppableArea = elemBelow.closest('.table-column__drop-area')
    let droppableElem = elemBelow.closest('.table-column__drop-item')

    if (currentDroppable.value != droppableArea) {
      // мы либо залетаем на цель, либо улетаем из неё
      // внимание: оба значения могут быть null
      //   currentDroppable=null,
      //     если мы были не над droppable до этого события (например, над пустым пространством)
      //   droppableArea=null,
      //     если мы не над droppable именно сейчас, во время этого события

      if (currentDroppable.value) {
        // логика обработки процесса "вылета" из droppable (удаляем подсветку)
        deleteItem({
          dropItemId: +droppableElem?.dataset.itemid,
          dropItemIndex: +droppableElem?.dataset.itemindex,
          dropColumnId: +currentDroppable.value.dataset.columnid,
          dropColumnIndex: +currentDroppable.value.dataset.columnindex,
          currColumnId: +props.column.id,
          currColumnIndex: +props.columnIndex,
          currItemId: +currentTodo.value.dataset.itemid,
          currItemIndex: +currentTodo.value.dataset.itemindex,
        })
        // currentDroppable.value = null
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
            currColumnId: +props.column.id,
            currColumnIndex: +props.columnIndex,
            currItemId: +currentTodo.value.dataset.itemid,
            currItemIndex: +currentTodo.value.dataset.itemindex,
          })
        }
        // Пересечение только с таблицей
        if (droppableArea && droppableElem === null) {
          addItem({
            dropColumnId: +droppableArea.dataset.columnid,
            dropColumnIndex: +droppableArea.dataset.columnindex,
            currColumnId: +props.column.id.toString(),
            currColumnIndex: +props.columnIndex.toString(),
            currItemId: +currentTodo.value.dataset.itemid,
            currItemIndex: +currentTodo.value.dataset.itemindex,
            name: 'column',
          })
        }
        //   enterDroppable(currentDroppable.value)
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
            currColumnId: +props.column.id,
            currColumnIndex: +props.columnIndex,
            currItemId: +currentTodo.value.dataset.itemid,
            currItemIndex: +currentTodo.value.dataset.itemindex,
          })
        }
      }
    }
  }

  const dragStop = e => {
    console.log('dragstop')
    //Очистка всех значений до первоначальных
    // Todo - сохранение позиции элемента после отжатия кнопки
    dragging.value = false
    mouseMove.value = false
    if (currentTodo && currentTodo.value) {
      if (columns.items[currentTodo.value.dataset.itemindex]) {
        columns.items[currentTodo.value.dataset.itemindex].moving = false
      }
      currentTodo.value.style.top = `auto`
      currentTodo.value.style.left = `auto`
      currentTodo.value.style.position = 'relative'
      currentTodo.value.style.display = 'flex'
      currentTodo.value.style.zIndex = '10'
      saveItem({
        itemId: +currentTodo.value.dataset.itemid,
        itemIndex: +currentTodo.value.dataset.itemindex,
        columnId: props.column.id,
        columnIndex: props.columnIndex,
      })
    }

    startCoords.value.x = 0
    startCoords.value.y = 0
    indent.value.x = 0
    indent.value.y = 0
  }

  const addItem = item => {
    placeHolderItem.value = {
      ...columns[item.currColumnIndex].items.find(
        todoItem => todoItem.id === item.currItemId
      ),
      placeholder: true,
    }

    if (!placeHolderItem.value) {
      return
    }

    const dropColumn = columns[item.dropColumnIndex]
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
        v-for="(column, columnI) in columns"
        :key="column.id"
        :column="column"
        :index="columnI"
        @delete-item="deleteItem($event)"
        @add-item="addItem($event)"
        @save-item="saveItem($event)"
      >
        <template #content>
          <ToDoTableColumnItem
            v-for="(item, itemI) in column.items"
            :key="item.id"
            :item="item"
            :index="itemI"
            @drag-start="dragStart($event)"
            @click="clickItemUp($event)"
          >
            {{ item.id }}
          </ToDoTableColumnItem>
        </template>
      </ToDoTableColumn>
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
