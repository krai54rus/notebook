<script setup lang="ts">
  import { computed, ref } from 'vue'
  import DragNDropArea from './DragNDropArea.vue'
  import { useToDoStore } from '@/pinia/todo'
  import { ITodoItem } from '@/entities/todo/TodoColumnTypes'

  const store = useToDoStore()
  const todoLists = computed(() => store.columns)
  store.loadColumns()

  const handleDrop = (
    sourceId: string | number,
    targetAreaId: string | number,
    item: ITodoItem,
    position: number
  ) => {
    console.log('drop on Board', sourceId, targetAreaId, item, position)
    // Find source and target lists
    const sourceList = todoLists.value.find(list =>
      list.items.some(i => i.id === sourceId)
    )
    const targetList = todoLists.value.find(list => list.id === targetAreaId)

    if (!sourceList || !targetList) return

    // Remove item from source list if moving to a different list
    if (sourceList.id !== targetList.id) {
      const sourceIndex = sourceList.items.findIndex(i => i.id === sourceId)
      if (sourceIndex !== -1) {
        sourceList.items.splice(sourceIndex, 1)
      }
    }

    // Create a copy of the item with a new ID if staying in the same list
    const newItem =
      sourceList.id === targetList.id
        ? { ...item, id: `${item.id}-copy-${Date.now()}` }
        : item

    if (sourceList.id === targetList.id) {
      return
    }

    // Insert the item at the specified position
    targetList.items.splice(position, 0, newItem)
  }

  const handleDragStart = (
    itemId: string | number,
    areaId: string | number,
    item: ITodoItem,
    target: HTMLElement | null
  ) => {
    console.log('drag start', itemId, areaId, item)
    if (target) {
      target.style.backgroundColor = 'red'
    }
    // const targetListIndex = todoLists.value.findIndex(
    //   list => list.id === areaId
    // )
    // if (targetListIndex !== -1) {
    //   const currentItemIndex = todoLists.value[targetListIndex].items.findIndex(
    //     i => i.id === itemId
    //   )
    //   if (currentItemIndex !== -1) {
    //     todoLists.value[targetListIndex].items.splice(currentItemIndex, 1)
    //   }
    // }
  }

  const handleDragEnd = () => {
    console.log('drag end')
  }
</script>

<template>
  <div class="todo-board">
    <DragNDropArea
      v-for="list in todoLists"
      :key="list.id"
      :id="list.id"
      :title="list.title"
      :items="list.items"
      class="todo-list"
      @drop="handleDrop"
      @drag-start="handleDragStart"
      @drag-end="handleDragEnd"
    />
  </div>
</template>

<style lang="scss" scoped>
  .todo-board {
    display: flex;
    gap: $spacing-6;
    padding: $spacing-5;
    min-height: 400px;
    background: $gray-100;
    border-radius: $border-radius-lg;
  }

  .todo-list {
    flex: 1;
    min-width: 280px;
    max-width: 400px;
  }
</style>
