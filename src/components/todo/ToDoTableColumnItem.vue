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

  const isEdit = ref(false)
  const elem = ref(null)
  const emit = defineEmits(['drag-start', 'click'])

  const handleDragStart = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    emit('drag-start', {
      item: props.item,
      index: props.index,
      columnIndex: props.columnIndex,
      elem: elem.value,
    })
  }

  const editClick = () => {
    console.log('edit click')
    isEdit.value = true
  }
  const handleClickUp = (e: any) => {
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
    class="n-p-4 n-mb-8 n-flex n-justify-space-between n-radius--full-sm"
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
    <div v-if="!isEdit" class="n-flex">
      <div>
        {{ item.placeholder ? '' : item.title }}
      </div>
      <div
        class="n-icon_sm"
        :class="$style['column-item__icon-edit']"
        @click="editClick()"
      >
        <nb-icon name="edit" />
      </div>
    </div>
    <div v-else class="">
      <nb-textarea :value="item.title"></nb-textarea>
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

    &__icon-edit {
      :hover {
        background-color: var(--color-gray-main);
      }
    }
  }
</style>
