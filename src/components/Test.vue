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

  let obj1 = { a: 2, b: 4 }
  let obj2 = obj1
  function pow(obj: any, exponent: any) {
    obj.a **= exponent
    obj.b **= exponent
  }
  pow(obj2, 2)
  console.log(obj1, obj2)

  const vClass = {
    mounted: (el: any, bindings: any, vnode: any) => {
      const obj = bindings?.value
      if (obj) {
        console.log('vnode ', vnode)
        const w = window.innerWidth
        if (w > 1280 && obj['xl']) {
          el.classList.add(obj['xl'])
        }

        if (w < 1280 && w > 768 && obj['lg']) {
          el.classList.add(obj['lg'])
        }

        if (w < 768 && obj['sm']) {
          el.classList.add(obj['sm'])
        }
      }
    },
  }
</script>
<template>
  <div class="n-flex n-wp-100 n-hp-100" :class="$style['test']">
    <div
      class="n-wp-100 n-p-16 n-flex n-justify-center"
      :class="$style['test-wrapper']"
    >
      <div>
        <div
          class="n-p-32"
          v-class="{
            xl: $style['test_xl'],
            lg: $style['test_lg'],
            sm: $style['test_sm'],
          }"
        >
          TEST
        </div>
      </div>
      <div
        class="n-mr-100 n-flex n-justify-start n-align-center n-flex-column"
        :class="$style['test__list']"
      >
        <nb-input type="filled"></nb-input>
      </div>
      <div
        class="n-mr-100 n-flex n-justify-start n-align-center n-flex-column"
        :class="$style['test__list']"
      >
        <nb-textarea type="filled"></nb-textarea>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: test;

  .#{$component} {
    flex-grow: 1;
    overflow: hidden;

    &_xl {
      background-color: red;
    }

    &_lg {
      background-color: blue;
    }

    &_sm {
      background-color: green;
    }

    &-wrapper {
      // display: grid;
      // grid-template-columns: 200px 200px;
    }
    &__list {
      padding: 12px;
      width: 500px;
      // background-color: var(--color-gray-40);
    }
    &__item {
      width: 100px;
      padding: 4px 8px;
      // background-color: var(--color-white);
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
