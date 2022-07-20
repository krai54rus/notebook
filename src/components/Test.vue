<script lang="ts" setup>
  import WidgetBlock from './main/WidgetBlock.vue'
  import { ref, computed, onMounted } from 'vue'
  import { useTestStore } from '@/pinia/test'

  // const store = useTestStore()
  // store.loaditems('module/loaditems')
  // const data = computed(() => store.items)
  const items = ref([
    { id: 1, text: 'elem 1', list: 1 },
    { id: 2, text: 'elem 2', list: 1 },
    { id: 3, text: 'elem 3', list: 1 },
    { id: 4, text: 'elem 4', list: 2 },
  ])

  // const listOne = computed(() => items.value.filter(i => i.list === 1))
  // const listTwo = computed(() => items.value.filter(i => i.list === 2))
  const itemRefs = ref([])
  const currentTodo = ref({})
  const coords = ref({ x: 0, y: 0 })
  let dragging = ref(false)
  let mouseMove = ref(false)

  onMounted(() => {
    // alert(todoRefs.value)
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', dragStop)
  })

  const dragStart = (e, { item, index }) => {
    const elem = itemRefs.value[index]
    if (elem) {
      currentTodo.value = elem
    }
    coords.value.x = e.clientX
    coords.value.y = e.clientY
    dragging.value = true
    e.preventDefault()

    // if (this.top == 0) {
    //   this.top = this.$refs.modalRef.getBoundingClientRect().y;
    // }
    console.log('elem ', elem)
    console.log(e)
  }

  const clickUp = (e, { item, index }) => {
    if (!mouseMove) {
      // this.getCoords(event);
    }
  }

  const onDrag = event => {
    if (dragging.value) {
      mouseMove.value = true

      const { clientX, clientY } = event.changedTouches
        ? event.changedTouches[0]
        : event

      console.log('currentTodo ', currentTodo)
      console.log('currentTodo value', currentTodo.value)

      currentTodo.value.style.position = 'absolute'
      currentTodo.value.style.top = `${clientY}px`
      currentTodo.value.style.left = `${clientX}px`
    }
  }

  const dragStop = () => {
    dragging.value = false
    mouseMove.value = false
    currentTodo.value.style.position = 'relative'
    currentTodo.value.style.top = `auto`
    currentTodo.value.style.left = `auto`
    // currentTodo.value.style.top = `${coords.value.y}px`
    // currentTodo.value.style.left = `${coords.value.x}px`
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
      >
        <div
          v-for="(item, index) in items"
          :class="$style['test__item']"
          :ref="el => itemRefs.push(el)"
          :key="item.id"
          @mousedown="dragStart($event, { item, index })"
          @mouseup="clickUp($event, { item, index })"
        >
          {{ item.text }}
        </div>
      </div>
      <!-- <div
        class="n-flex n-justify-start n-align-center n-flex-column"
        :class="[$style['test__list'], $style['drop-zone']]"
      >
        <div
          :class="$style['test__item']"
          v-for="item in listTwo"
          :key="item.id"
        >
          {{ item.text }}
        </div>
      </div> -->
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
      z-index: 100;
      // cursor: pointer;
    }

    .drop-item {
      position: absolute;
    }

    .drop-zone {
      background-color: #eee;
      margin-bottom: 10px;
      padding: 10px;
    }
  }
</style>
