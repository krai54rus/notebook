<script lang="ts" setup>
  import WidgetBlock from './main/WidgetBlock.vue'
  import { ref, computed } from 'vue'
  import { useTestStore } from '@/pinia/test'

  const store = useTestStore()
  store.loaditems()

  const data = computed(() => store.items)
  const items = ref([
    { id: 1, text: 'elem 1', list: 1 },
    { id: 2, text: 'elem 2', list: 1 },
    { id: 3, text: 'elem 3', list: 1 },
    { id: 4, text: 'elem 4', list: 2 },
  ])

  const listOne = computed(() => items.value.filter(i => i.list === 1))
  const listTwo = computed(() => items.value.filter(i => i.list === 2))

  const startDrag = (evt, item) => {
    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.effectAllowed = 'move'
    evt.dataTransfer.setData('itemID', item.id)
    console.log('evt.dataTransfer ', evt.dataTransfer)
  }
  const onDrop = (evt, list) => {
    console.log('evt ', evt.dataTransfer)
    console.log('evt ', evt.dataTransfer.getData('itemID'))
    console.log('list ', list)
    const itemID = evt.dataTransfer.getData('itemID')
    const item = items.value.find(item => item.id == itemID)
    console.log('item ', item)
    item.list = list
    console.log('item ', item)
  }
</script>
<template>
  <div class="n-flex n-wp-100 n-hp-100" :class="$style['test']">
    <div
      class="n-wp-100 n-p-16 n-flex n-justify-center"
      :class="$style['test-wrapper']"
    >
      <div
        class="n-mr-100 n-flex n-justify-start n-align-center n-flex-column"
        :class="[$style['test__list'], $style['drop-zone']]"
        @drop="onDrop($event, 1)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          :class="$style['test__item']"
          v-for="item in listOne"
          :key="item.id"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          {{ item.text }}
        </div>
      </div>
      <div
        class="n-flex n-justify-start n-align-center n-flex-column"
        :class="[$style['test__list'], $style['drop-zone']]"
        @drop="onDrop($event, 1)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div
          :class="$style['test__item']"
          v-for="item in listTwo"
          :key="item.id"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: test;

  .#{$component} {
    flex-grow: 1;
    overflow: hidden;

    &-wrapper {
      // display: grid;
      // grid-template-columns: 200px 200px;
    }
    &__list {
      padding: 12px;
      width: 150px;
      background-color: var(--color-gray-40);
    }
    &__item {
      width: 100px;
      padding: 4px 8px;
      background-color: var(--color-white);
      margin-bottom: 10px;
      border-radius: var(--radius-md);
      // cursor: pointer;
    }

    .drop-zone {
      background-color: #eee;
      margin-bottom: 10px;
      padding: 10px;
    }
  }
</style>
