<script lang="ts" setup>
  import { ref } from 'vue'

  // const store = useTestStore()
  // store.loaditems('module/loaditems')
  // const data = computed(() => store.items)
  const items = ref([
    { id: 1, text: 'elem 1', list: 1 },
    { id: 2, text: 'elem 2', list: 1 },
    { id: 3, text: 'elem 3', list: 1 },
    { id: 4, text: 'elem 4', list: 2 },
  ])

  const container = ref('container')

  const createTest = (e: MouseEvent) => {
    console.log('e ', e)
    const div = document.createElement('div')
    div.classList.add('block')
    div.style.width = '100px'
    div.style.height = '100px'
    div.style.position = 'absolute'
    div.style.backgroundColor = 'red'
    div.style.left = `${e.clientX * 2}px`
    div.style.top = `${e.clientY * 2}px`

    //@ts-ignore
    container?.value.appendChild(div)
  }
</script>
<template>
  <div
    class="n-flex n-wp-100 n-hp-100 container"
    ref="container"
    @click="createTest"
    :class="$style['test']"
  >
    <div :class="$style['test-absolute']"></div>
  </div>
</template>
<style scoped>
  .block {
    width: 100px;
    height: 100px;
    position: absolute;
    background-color: red;
  }
</style>
<style lang="scss" module>
  $component: test;

  .#{$component} {
    flex-grow: 1;

    .block {
      width: 100px;
      height: 100px;
      position: absolute;
      background-color: red;
    }

    .test-absolute {
      position: absolute;
      width: 200px;
      height: 200px;
      left: 100px;
      top: 100px;
      background-color: rgb(81, 81, 172);
    }
  }
</style>
