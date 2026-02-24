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
      // Visually hide the dragged element without changing the data,
      // so the native drag-and-drop stays intact.
      target.style.opacity = '0'
      target.style.height = '0px'
    }
  }

  const handleDragEnd = () => {
    console.log('drag end')
    // Nothing to do in the store; item visibility is restored
    // by the browser once the drag operation finishes.
  }
</script>

<template>
  <div class="todo-board">
    <div class="fixed">test fixed</div>
    <div class="abolute">test absolute</div>
    <button class="btn">Нажми меня</button>
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
<style>
  .btn {
    width: 200px;
    height: 50px;
    background: linear-gradient(to right, #4caf50, #8bc34a);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    transition: all 0.3s ease;
    /* Создаем слой заранее для анимации */
    /* will-change: transform, box-shadow; */
  }

  .btn:hover {
    /* ХОРОШО: transform и opacity - Composite only */
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

    /* ПЛОХО: если бы мы использовали:
       width: 210px;      → Layout + Paint + Composite
       height: 55px;      → Layout + Paint + Composite
       margin-top: -2px;  → Layout + Paint + Composite
    */
  }
</style>
<style lang="scss" scoped>
  .todo-board {
    display: flex;
    gap: $spacing-6;
    padding: $spacing-5;
    min-height: 400px;
    background: $gray-100;
    border-radius: $border-radius-lg;
  }

  .fixed {
    right: 150px;
    top: 150px;
    position: fixed;
  }

  .abolute {
    position: absolute;
    right: 100px;
    top: 100px;
  }

  .todo-list {
    flex: 1;
    min-width: 280px;
    max-width: 400px;
  }
</style>
