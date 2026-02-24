<script lang="ts" setup>
  import TestModal from '@/components/test/TestModal.vue'
  import {
    ref,
    computed,
    onMounted,
    onBeforeMount,
    onBeforeUpdate,
    onUpdated,
    onRenderTriggered,
    onRenderTracked,
    onUnmounted,
    onBeforeUnmount,
    watch,
    watchEffect,
    h,
  } from 'vue'
  import { useTestStore } from '@/pinia/test'
  import api from '@/api'

  const asyncFunc = async () => {
    console.log('asyncFunc')
    try {
      const res: any = await api(
        'https://jsonplaceholder.typicode.com/users',
        'GET'
      )
      console.log('res in async', res)
      if (res) {
        return res
      }
    } catch (error) {
      console.log('erasync ', error)
      return error
    }
  }

  // const asyncFuncPromise = new Promise(async (resolve, rej) => {
  //   console.log('asyncFunc')
  //   try {
  //     console.log('try')
  //     const res: any = await api(
  //       'https://jsonplaceholder.typicode.com/users',
  //       'GET'
  //     )
  //     console.log('res in async', res)
  //     if (res) {
  //       resolve(res)
  //     }
  //   } catch (error) {
  //     console.log('erasync ', error)
  //     rej(error)
  //   }
  // })

  const testPromise = () => {
    console.log('testPromise 1')
    // Promise.resolve(asyncFunc).then(res => console.log('resolve ', res))
    Promise.resolve(asyncFunc).then(res => console.log('resolve ', res))
    console.log('testPromise 2')
  }
  // const store = useTestStore()
  // store.loaditems('module/loaditems')
  // const data = computed(() => store.items)
  const items = ref([
    { id: 1, text: 'elem 1', list: 1 },
    { id: 2, text: 'elem 2', list: 1 },
    { id: 3, text: 'elem 3', list: 1 },
    { id: 4, text: 'elem 4', list: 2 },
  ])

  const Func = () => {
    return h('ul', null, [
      items.value.map((item, index) => {
        return h('li', { key: item.id }, `elFunc ${item.id}`)
      }),
    ])
  }

  const Qwe = h('ul', null, [
    items.value.map((item, index) => {
      return h('li', { key: item.id }, item.text)
    }),
  ])

  // const vClass = {
  //   mounted: (el: any, bindings: any, vnode: any) => {
  //     const obj = bindings?.value
  //     if (obj) {
  //       console.log('vnode ', el, bindings, vnode)
  //       const w = window.innerWidth
  //       if (w > 1280 && obj['xl']) {
  //         el.classList.add(obj['xl'])
  //       }

  //       if (w < 1280 && w > 768 && obj['lg']) {
  //         el.classList.add(obj['lg'])
  //       }

  //       if (w < 768 && obj['sm']) {
  //         el.classList.add(obj['sm'])
  //       }
  //     }
  //   },
  //   test: () => {
  //     console.log('test')
  //   },
  // }

  const handleApi = async () => {
    // const res = await api('https://jsonplaceholder.typicode.com/users', 'GET')
    const apiUrl = 'https://api.stalcraft.net/auction/prices'

    // Параметры запроса
    const params = {
      region: 'RU', // Регион (например, RU, EU и т.д.)
      itemId: '12345', // ID предмета, который тебя интересует
    }

    // Формируем URL с параметрами
    const url = `${apiUrl}?region=${params.region}&itemId=${params.itemId}`
    const res = await api(url, 'GET')
    console.log('res ', res)
  }

  const testBtnRes = ref(false)

  const handleTestBtn = () => {
    testBtnRes.value = !testBtnRes.value
  }

  const startDrag = (e: Event) => {
    console.log(e)
  }

  const testBtnRef = ref(null)
  const testContainerRef = ref(null)

  onBeforeMount(() => {
    console.log('onBeforeMount ', testBtnRes.value)
  })

  onMounted(() => {})

  onBeforeUpdate(() => {
    console.log(
      'onBeforeUpdate ',
      testBtnRes.value,
      testBtnRef.value,
      testContainerRef.value
    )
  })

  onUpdated(() => {
    console.log(
      'onUpdated ',
      testBtnRes.value,
      testBtnRef.value,
      testContainerRef.value
    )
  })

  onBeforeUnmount(() => {
    console.log('onBeforeUnmount ', testBtnRes.value)
  })

  onUnmounted(() => {
    console.log('onUnmounted ', testBtnRes.value)
  })
  const testComputed = computed(() => {
    return `${testBtnRes.value}`.toUpperCase()
  })

  watch([testComputed, testBtnRes], (val, old, onCleanup) => {
    console.log('watch', val, old)
    onCleanup(() => {
      console.log('asd')
    })
  })

  watchEffect(() => {
    console.log('watchEffect ', testComputed.value)
  })
  // Отслеживание зависимостей
  // onRenderTracked(event => {
  //   console.log('Зависимость отслежена:', {
  //     target: event.target,
  //     type: event.type,
  //     key: event.key,
  //     value: event.newValue,
  //   })
  // })

  // // Отслеживание триггеров обновлений
  // onRenderTriggered(event => {
  //   console.log('Обновление вызвано:', {
  //     target: event.target,
  //     type: event.type,
  //     key: event.key,
  //     oldValue: event.oldValue,
  //     newValue: event.newValue,
  //   })

  //   // Пример логики для отладки:
  //   if (event.key === 'count' && event.newValue > 10) {
  //     console.warn('Count превысил 10!')
  //   }
  // })
  const isModal = ref(false)
  const inputValue = ref('')
</script>
<template>
  <div class="n-flex n-wp-100 n-hp-100" :class="$style['test']">
    <div
      ref="testContainerRef"
      class="n-wp-100 n-p-16 n-flex n-justify-center"
      :class="$style['test-wrapper']"
    >
      <nb-input v-model="inputValue"></nb-input>
      <!-- <TestComponent></TestComponent> -->
      <Transition name="testm">
        <TestModal v-if="isModal" @close="isModal = false"></TestModal>
      </Transition>
      <nb-button @click="inputValue = ''">clearInput</nb-button>
      <nb-button @click="isModal = !isModal">modalClick</nb-button>
      <!-- <TestComponent1></TestComponent1> -->
      <!-- <div class="n-flex" :class="$style['lists']">
        <Func></Func>
        <Qwe></Qwe>
        <ul>
          <li v-for="{ id, text } in items" :key="id">
            {{ text }}
          </li>
        </ul>
      </div>
      <picture>
        <source srcset="750x100.png" media="(min-width: 1000px)" />
        <img src="650x100.png" alt="Картинка с размерами" />
      </picture>
      <div id="b" class="a">
        <div id="d">
          <div class="a c">auto</div>
        </div>
        <div id="e">
          <div class="a c">isolate</div>
        </div>
      </div>
      <div class="n-flex">
        <div :class="[$style['oklchtest'], $style['test-red']]">1</div>
        <div :class="[$style['oklchtest'], $style['test-green']]">2</div>
        <div :class="[$style['oklchtest'], $style['test-blue']]">3</div>
      </div>
      {{ testBtnRes + ' ' + testComputed }}
      <nb-button
        ref="testBtnRef"
        color="blue"
        size="normal"
        :text="testBtnRes"
        @click="handleTestBtn()"
        style="width: 200px"
      ></nb-button>
      <div
        draggable
        @dragstart="startDrag($event)"
        style="width: 200px; height: 200px; background-color: aqua"
      >
        {{ testBtnRes }} test
      </div>
      <div style="width: 200px">
        <nb-button
          color="green"
          size="small"
          text="TEST API"
          @click="handleApi()"
        ></nb-button>
      </div> -->
      <!-- <div>
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
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" module>
  $component: test;
  $rH: 17;
  $gH: 170;
  $bH: 270;
  $red: oklch(0.49 0.155 17);
  $green: oklch(0.49 0.155 170);
  $blue: oklch(0.49 0.155 270);
  $oklch-colors: (
    red: $rH,
    green: $gH,
    blue: $bH,
  );

  .#{$component} {
    .testm {
      &--enter-active,
      &--leave-active {
        transition: opacity 1s ease;
      }

      &--enter-from,
      &--leave-to {
        opacity: 0;
      }
      transition: ease;
      // &-enter-from,
      // .appear-from {
      //   opacity: 0;
      // }
      // &-enter-to,
      // .appear-to {
      //   opacity: 0;
      // }
    }
    flex-grow: 1;
    overflow: hidden;

    .lists {
      gap: 24px;
    }

    .oklchtest {
      width: 100px;
      height: 100px;
      margin-right: 50px;
    }
    .test {
      @each $key, $value in $oklch-colors {
        &-#{$key} {
          background-color: oklch(0.5 0.155 $value);
          transition: 0.5s;

          &:hover {
            background-color: oklch(0.5 1 $value);
          }
        }
      }
    }
    .a {
      background-color: rgb(0, 255, 0);
    }
    #b {
      width: 200px;
      height: 210px;
    }
    .c {
      width: 100px;
      height: 100px;
      border: 1px solid black;
      padding: 2px;
      mix-blend-mode: difference;
    }
    #d {
      isolation: auto;
    }
    #e {
      isolation: isolate;
    }

    &_xl {
      background-color: rgb(139, 22, 22);
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
