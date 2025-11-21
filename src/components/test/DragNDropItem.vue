<!-- DragNDropItem.vue -->
<template>
  <div
    :class="['drag-drop-item', className]"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    style="cursor: move"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'

  interface Props {
    id: string | number
    className?: string
  }

  const props = defineProps<Props>()
  const emit = defineEmits<{
    (e: 'dragStart', event: DragEvent, id: string | number): void
    (e: 'dragEnd', event: DragEvent): void
  }>()

  const handleDragStart = (e: DragEvent) => {
    console.log('handleDragStart ITEM', e)
    if (!e.dataTransfer || !e.currentTarget) return

    // Create a ghost image of the dragged element
    // const draggedElement = e.currentTarget as HTMLElement
    // const ghost = draggedElement.cloneNode(true) as HTMLElement
    // ghost.style.position = 'absolute'
    // ghost.style.top = '-1000px'
    // document.body.appendChild(ghost)
    // const canvas = document.createElement('canvas')
    // canvas.width = canvas.height = 50

    // const ctx = canvas.getContext('2d')
    // ctx.lineWidth = 4
    // ctx.moveTo(0, 0)
    // ctx.lineTo(50, 50)
    // ctx.moveTo(0, 50)
    // ctx.lineTo(50, 0)
    // ctx.stroke()

    // const dt = e.dataTransfer
    // dt.setData('text/plain', props.id.toString())
    // dt.setDragImage(canvas, 25, 25)
    // e.dataTransfer.setDragImage(ghost, 0, 0)

    // Clean up ghost element after drag starts
    // setTimeout(() => {
    //   document.body.removeChild(ghost)
    // }, 0)

    // e.dataTransfer.setData('text/plain', props.id.toString())
    emit('dragStart', e, props.id)
  }

  const handleDragEnd = (e: DragEvent) => {
    emit('dragEnd', e)
  }
</script>

<style scoped>
  .drag-drop-item {
    user-select: none;
  }
</style>
