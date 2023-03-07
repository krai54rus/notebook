<script lang="ts" setup>
  import TestWrapper from './test/TestWrapper.vue'
  import { ref, computed, provide, onMounted } from 'vue'
  import { useTestStore } from '@/pinia/test'
  import api from '@/api'

  const items = ref([])

  const testObj = () => {
    const obj: any = {
      id: 1,
      name: 'john',
      say: () => {
        console.log('saddas')
      },
      ky() {
        console.log('kyky ', this)
      },
      // [Symbol.iterator]: () => {
      //   return {
      //     i: 0,
      //     next() {
      //       if (this.i < Object.keys(obj).length) {
      //         // this.i++
      //         return { value: this.i++, done: false }
      //       }
      //       return { value: 'end', done: true }
      //     },
      //   }
      // },
      *[Symbol.iterator]() {
        for (const key in obj) {
          // console.log('ley ', key)
          yield key
        }
        // return {
        //   i: 0,
        //   next() {
        //     if (this.i < Object.keys(obj).length) {
        //       // this.i++
        //       return { value: this.i++, done: false }
        //     }
        //     return { value: 'end', done: true }
        //   },
        // }
      },
    }

    const obj1: any = {
      qwe: 'ewq',
      __proto__: obj,
    }

    // for (const key in obj1) {
    //   // console.log('key ', obj1[key])
    //   // console.log('key ', obj.hasOwnProperty(key))
    //   if (Object.prototype.hasOwnProperty.call(obj1, key)) {
    //     const element = obj1[key]
    //     console.log('element ', element)
    //   }
    // }

    for (const key of obj) {
      console.log('key ', key)
    }
  }

  const testFunc = (...args: number[][]) => {
    const genericArr: number[] = []

    args.map((arg, index) => {
      arg.forEach(num => {
        let isGenericNum: any = undefined
        const newArgsArray = [...args]
        newArgsArray.splice(index, 1)
        newArgsArray.map(argS => {
          if (argS.indexOf(num) !== -1 && isGenericNum !== null) {
            isGenericNum = num
          } else {
            isGenericNum = null
          }
        })

        if (typeof isGenericNum === 'number') {
          if (genericArr.indexOf(isGenericNum) === -1) {
            genericArr.push(isGenericNum)
          }
        }
      })
    })

    console.log('genericArr ', genericArr)
  }

  const initialFunc = () => {
    testObj()
    // testFunc([1, 2, 3, 4], [3, 4, 5, 6], [1, 3, 4, 7], [1, 2, 3, 4, 5, 6, 7])
  }
  onMounted(() => initialFunc())
  const data = computed(() => items)
  provide('data', items.value)
</script>
<template>
  <div class="n-flex n-wp-100 n-hp-100" :class="$style['main']">
    <TestWrapper></TestWrapper>
  </div>
</template>

<style lang="scss" module>
  $component: main;

  .#{$component} {
    flex-grow: 1;
    overflow: hidden;
  }
</style>
