<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import plusSvg from '@/assets/icons/plus_24.svg?raw'

  interface Props {
    item: any
    index: number
    columnIndex: number
  }

  const props = withDefaults(defineProps<Props>(), {
    item: {},
    index: 0,
    columnIndex: 0,
  })

  const elem = ref(null)
  const emit = defineEmits(['drag-start', 'click'])

  const handleDragStart = e => {
    e.preventDefault()
    emit('drag-start', {
      e,
      item: props.item,
      index: props.index,
      columnIndex: props.columnIndex,
      elem: elem.value,
    })
  }

  const handleClickUp = e => {
    emit('click', {
      e,
      item: props.item,
      index: props.index,
      columnIndex: props.columnIndex,
      elem: elem.value,
    })
  }
</script>

<template>
  <div
    class="n-p-4 n-mb-8 n-flex n-justify-start n-radius--full-sm"
    :class="{
      [$style['column-item']]: true,
      'column-drop-item': !item.moving,
      [$style['column-moving-item']]: item.moving,
      [$style['column-item_placeholder']]: item.placeholder,
    }"
    ref="elem"
    :data-itemid="item.id"
    :data-itemindex="index"
    @mousedown="handleDragStart($event)"
    @mouseup="handleClickUp($event)"
  >
    <div>
      {{ item.placeholder ? '' : item.title }}
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: column-item;

  .#{$component} {
    background-color: var(--color-white);
    box-shadow: 0 1px 0 #091e4240;
    cursor: pointer;
    width: 284px;
    position: relative;
    z-index: 10;

    &:hover {
      background-color: var(--color-white-hovered);
    }

    &_placeholder {
      background-color: var(--gainsboro);
      height: 24px;
    }
  }
</style>
