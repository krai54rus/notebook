<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import plusSvg from '@/assets/icons/plus_24.svg?raw'
  import ToDoColumnModel from '@/entities/todo/ToDoColumnModel'

  interface Props {
    column: IToDoColumn
    columnIndex: number
  }

  const props = withDefaults(defineProps<Props>(), {
    column: ToDoColumnModel.create(),
    columnIndex: 0,
  })

  const columnItems = computed(() =>
    props.column.items.map(item => {
      // item.moving = false
      // item.placeholder = false
      return item
    })
  )

  let dragging = ref(false)
  let mouseMove = ref(false)
  const itemsArr = ref([])
  const itemRefs = { itemsArr }
  const currentTodo = ref(null)
  const currentDroppable = ref(null)
  const startCoords = ref({ x: 0, y: 0 })
  const indent = ref({ x: 0, y: 0 })
  const emit = defineEmits(['add-item', 'delete-item', 'save-item'])

  const testF = () => {
    console.log(itemRefs.itemsArr.value)
  }

  const addItem = item => {
    emit('add-item', item)
  }

  const deleteItem = item => {
    emit('delete-item', item)
  }

  const saveItem = item => {
    emit('save-item', item)
  }

  onMounted(() => {
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', dragStop)
  })

  const dragStart = (e, { item, index }) => {
    e.preventDefault()
    const elem = itemRefs.itemsArr.value[index]
    if (elem) {
      dragging.value = true
      currentTodo.value = elem
      const coordsElem = elem.getBoundingClientRect()
      startCoords.value.x = e.clientX
      startCoords.value.y = e.clientY
      indent.value.x = e.clientX - coordsElem.left
      indent.value.y = e.clientY - coordsElem.top
      props.column.items[index].moving = true
    }
  }

  const clickItemUp = (e, { item, index }) => {
    if (mouseMove.value) {
      dragStop(e)
    } else {
      console.log('item click, openModal')
    }
  }

  const onDrag = event => {
    if (dragging.value) {
      mouseMove.value = true
      elemMoving(event)
      intersectObs(event)
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
    //Очистка всех значений до первоначальных
    // Todo - сохранение позиции элемента после отжатия кнопки
    dragging.value = false
    mouseMove.value = false
    if (currentTodo && currentTodo.value) {
      if (props.column.items[currentTodo.value.dataset.itemindex]) {
        props.column.items[currentTodo.value.dataset.itemindex].moving = false
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
</script>

<template>
  <div
    class="n-mr-8 table-column__drop-area"
    :class="[$style['table-column__wrapper']]"
    :data-columnid="column.id"
    :data-columnindex="columnIndex"
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
        <div
          class="n-flex n-flex-column"
          :class="$style['table-column__list']"
          @click="testF()"
        >
          <div
            v-for="(item, index) in columnItems"
            class="n-p-4 n-mb-8 n-flex n-justify-start n-radius--full-sm"
            :class="{
              [$style['table-column__item']]: true,
              'table-column__drop-item': !item.moving,
              [$style['table-column__moving-item']]: item.moving,
              [$style['placeholder']]: item.placeholder,
            }"
            :ref="itemRefs.itemsArr"
            :key="item.id"
            :data-itemid="item.id"
            :data-itemindex="index"
            @mousedown="dragStart($event, { item, index })"
            @mouseup="clickItemUp($event, { item, index })"
          >
            <div>
              {{ item.placeholder ? '' : item.title }}
            </div>
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
    &__item {
      background-color: var(--color-white);
      box-shadow: 0 1px 0 #091e4240;
      cursor: pointer;
      width: 284px;
      position: relative;
      z-index: 10;

      &:hover {
        background-color: var(--color-white-hovered);
      }
    }
    // &__moving-item {
    //   position: absolute;
    //   z-index: 100;
    // }
    &__plus {
      &:before {
        content: '\e901';
      }
    }
  }
</style>
