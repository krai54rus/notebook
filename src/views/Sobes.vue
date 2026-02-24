<script lang="ts" setup>
  import TestModal from '@/components/test/TestModal.vue'
  import { ref, onMounted, onBeforeMount, Transition } from 'vue'
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

  const testPromise123 = () => {
    console.log('testPromise 1')
    // Promise.resolve(asyncFunc).then(res => console.log('resolve ', res))
    Promise.resolve(asyncFunc).then(res => console.log('resolve ', res))
    console.log('testPromise 2')
  }
  const items = ref([
    { id: 1, text: 'elem 1', list: 1 },
    { id: 2, text: 'elem 2', list: 1 },
    { id: 3, text: 'elem 3', list: 1 },
    { id: 4, text: 'elem 4', list: 2 },
  ])

  // let obj1 = { a: 2, b: 4 }
  // let obj2 = obj1
  // function pow(obj: any, exponent: any) {
  //   obj.a **= exponent
  //   obj.b **= exponent
  // }
  // pow(obj2, 2)
  // console.log(obj1, obj2)

  const testBtnRes = ref(false)

  const testBtnRef = ref(null)
  const testContainerRef = ref(null)

  onBeforeMount(() => {
    console.log('onBeforeMount ', testBtnRes.value)
  })

  const testFF = function () {
    let name = 'n1'
    const cName = 'n1'

    function logCName() {
      console.log('logCName ', cName)
    }

    if (true) {
      name = 'n2'
      const cName = 'n3'
      logCName()
    }
    console.log('name ', name)
  }

  const reverseString = (str: string) => {
    let reversedStr = ''
    for (let i = str.length - 1; i >= 0; i--) {
      reversedStr += str[i]
    }
    console.log('revStr- ', reversedStr)
    return str.split('').reverse().join('')
  }
  onMounted(async () => {
    // function getM(amount: number): { [key: number]: { count: number } } {
    //   const dArr = [5000, 1000, 500, 100, 50]
    //   const finder = dArr.indexOf(amount)
    //   if (finder !== -1) return { [amount]: { count: 1 } }

    //   const map: { [key: number]: { count: number } } = {}

    //   const finderFunc = (arr: number[], remAm: number) => {
    //     const filteredDArr = arr.filter(item => item <= remAm)
    //     const maxD = Math.max(...filteredDArr)
    //     const delAm = remAm % maxD
    //     const remainder = Math.floor(remAm / maxD)
    //     map[maxD] = { count: remainder }
    //     if (delAm) {
    //       finderFunc(filteredDArr, delAm)
    //     }
    //   }

    //   finderFunc(dArr, amount)
    //   return map
    // }

    // getM(4650)

    function sum(a: number, b: number) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const rnd = Math.random()
          console.log(rnd, a, b)
          if (rnd < 0.3) {
            resolve(a + b)
          } else {
            reject('err')
          }
        }, 500)
      })
    }

    // sum(3, 2).then(
    //   value => console.log(value),
    //   // 5 (с вероятностью 30%)
    //   reason => console.log(reason)
    //   // 'err' (с вероятностью 70%)
    // )

    const withRetry = (
      fn: (a: number, b: number) => Promise<unknown>,
      limit: number
    ) => {
      let count = 0
      const errors = []
      return async function recall(...args) {
        count++
        console.log('recall -- ', args)
        try {
          const q = await fn.call(this, ...args)
          return q
        } catch (error) {
          errors.push(error)
          if (count < limit) {
            return await recall(...args)
          } else {
            return errors
          }
        }
      }
    }
    // const enhancedSum = withRetry(sum, 2)

    // enhancedSum(3, 2).then(
    //   value => console.log('value ', value),
    //   // 5 (с вероятностью 76%)
    //   reason => console.log('reason ', reason.errors)
    //   // ['err1', 'err2', 'err3', 'err4']
    //   // (с вероятностью 24%)
    // )

    const tickets = [
      { from: 'Moscow', to: 'SPb' },
      { from: 'NY', to: 'London' },
      { from: 'London', to: 'Moscow' },
    ]

    const sortTickets = (tickets: { from: string; to: string }[]) => {
      let start = null
      const tripArr: { from: string; to: string }[] = []
      const mapp = new Map()
      const sett = new Set()
      for (let i = 0; i < tickets.length; i++) {
        const el = tickets[i]
        mapp.set(el.from, el)
        sett.add(el.to)
      }

      for (const [k, v] of mapp) {
        if (!sett.has(k)) {
          start = v
          break
        }
      }

      console.log('st ', start)

      const f = (st: { from: string; to: string }) => {
        tripArr.push(st)
        const get = mapp.get(st.to)
        console.log('get ', get)
        if (get && get.to) {
          f(get)
        } else {
          console.log('ff ', tripArr)
        }
      }
      f(start)
    }
    // sortTickets(tickets)
    class ATM {
      summ: number
      money: number[]
      mSumm: number[]
      constructor() {
        this.summ = 0
        this.mSumm = []
        // this.money = [5000, 1000, 500, 100, 50]
        this.money = []
      }

      deposit(money: number, num: number) {
        this.summ += money * num
        // return this
        this.mSumm[money] = num
        this.money.push(money)
        return this
      }
      withdraw(draw: number) {
        if (this.money.indexOf(draw) !== -1) {
          return { [draw]: 1 }
        }
        const drawObj: { [key: number]: number } = {}
        const getMoney = (mA: number[], dr: number) => {
          const getMArr = function (
            monArr: number[],
            dre: number,
            isMax?: number
          ): { maxM: number; fMoney: number[] } {
            const fMoney = monArr.filter(item => {
              if (isMax) {
                return item <= dre && isMax !== item
              }

              return item <= dre
            })
            const maxM = Math.max(...fMoney)

            if (maxM > dre) {
              console.log('fMoney ', maxM, fMoney)
              getMArr(monArr, maxM, dre)
            }

            return { maxM, fMoney }
          }
          const { maxM, fMoney } = getMArr(mA, dr)
          const rem = dr % maxM
          const count = Math.floor(dr / maxM)

          drawObj[maxM] = count
          // console.log('getMoney ', maxM, rem, count)
          if (rem) {
            // console.log('args ', fMoney, rem)
            getMoney(fMoney, rem)
          } else {
            console.log(drawObj)
            return drawObj
          }
        }
        getMoney(this.money, draw)
      }
    }
    const atm = new ATM()
      .deposit(1000, 5)
      .deposit(500, 4)
      .deposit(200, 3)
      .deposit(50, 2)
      .deposit(10, 1)

    // console.log(atm.withdraw(1550)) // { 1000: 1, 500: 1, 50: 1 }
    // console.log(atm.withdraw(600)) // { 200: 3 }

    const limits = {
      5000: 4,
      1000: 5,
      500: 7,
      100: 10,
      1: 50,
    } as const

    const getMoneyCycle = (sum: number, lim: typeof limits) => {
      const dens = Object.keys(lim)
        .map(Number)
        .sort((a, b) => b - a)
      const res: { [key: number]: number } = {}
      for (let den of dens) {
        if (sum <= 0) break

        const count = lim[den as keyof typeof lim]

        const rem = sum % den
        const remAvailable = Math.floor(sum / den)
        const countAvailable = Math.min(count, remAvailable)
        console.log('d - ', rem, den, count, remAvailable)
        if (rem >= 0) {
          res[den] = countAvailable
          sum -= den * countAvailable
          if (rem === 0) {
            break
          }
        }
      }

      console.log('res ', res)
    }

    getMoneyCycle(13450, limits)

    const lims = [5000, 1000, 500, 100, 50]
    const getMF = (sum: number, lims: number[]) => {
      const limits = [...lims].sort((a, b) => b - a)
      const res: { [key: number]: number } = {}

      for (let nominal of limits) {
        if (sum === 0) break
        const reminder = sum % nominal
        const count = Math.floor(sum / nominal)
        if (reminder >= 0) {
          res[nominal] = count
          sum -= nominal * count
          if (reminder === 0) {
            break
          }
        }
      }

      console.log('getMf ', res)
    }

    getMF(7450, lims)

    const clone = (obj: object) => {
      const newObj: any = {}
      // for (const key in obj) {
      //   if (obj.hasOwnProperty(key)) {
      //     const v = obj[key]
      //     const type = typeof v
      //     if (type === 'string' || type === 'number' || type === 'boolean' || type === 'undefined') {
      //       newObj[key] = v
      //     }
      //     if (Array.isArray(v)) {

      //     }
      //   }

      // }
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key]
        }
      }

      return newObj
    }
    const obj: any = {
      x: 1,
      y: {
        z: 2,
        t: 3,
      },
    }

    obj.z = obj

    const objCopy = clone(obj)
    console.log('objCopy ', objCopy)

    // PROMISES
    //
    //
    const withCache = (fn: () => Promise<unknown>, ms: number) => {
      const cache = new Map()

      // return function () {
      //   if (cache.has(fn.name)) {
      //     console.log('getCache ', cache)
      //     return cache.get(fn.name)
      //   }

      //   const pr = fn.call(this)
      //   cache.set(fn.name, pr)

      //   console.log('set cache ', cache)
      //   pr.then(res => {
      //     setTimeout(() => {
      //       cache.delete(fn.name)
      //       console.log('delete ', fn.name)
      //     }, ms)
      //   })

      //   return pr
      // }
      return function (...args) {
        const cacheKey = fn.name
        const now = Date.now()
        if (cache.has(cacheKey)) {
          const check = cache.get(cacheKey).expires - now
          console.log('check ', cache, check)
          if (check > 0) {
            return cache.get(cacheKey).promise
          }
          cache.delete(cacheKey)
        }

        console.log('check set ', cache)
        const pr = fn.call(this, ...args)
        cache.set(cacheKey, {
          promise: pr,
          expires: now + ms,
        })

        console.log('set cache ', cache)
        // pr.then(res => {
        //   if (cache.get(cacheKey).expires - now > 0) {
        //     cache.delete(fn.name)
        //     console.log('delete ', fn.name)
        //   }
        //   // setTimeout(() => {
        //   //   cache.delete(fn.name)
        //   //   console.log('delete ', fn.name)
        //   // }, ms)
        // })

        return pr
      }
    }

    let count = 0
    const testPromise = () => {
      return new Promise((res, rej) => {
        setTimeout(() => {
          count++
          console.log(count)
          res(count)
        }, 500)
      })
    }

    const cachedPr = withCache(testPromise, 2000)
    // console.log(await cachedPr())
    // console.log(await cachedPr())
    // console.log(await cachedPr())
    // console.log(await cachedPr())
    await cachedPr()
    await cachedPr()
    await cachedPr()
    await cachedPr()
    setTimeout(async () => await cachedPr(), 3000)
    setTimeout(async () => await cachedPr(), 3000)
    setTimeout(async () => await cachedPr(), 3000)
    // console.log(new ATM().withdraw(4750)) // { 200: 3 }
    // function equalArrays(arr1: unknown[], arr2: unknown[]): boolean {
    //   if (arr1.length !== arr2.length) {
    //     return false
    //   }

    //   // let isEqual = true
    //   const finds = []
    //   for (let i = 0; i < arr1.length; i++) {
    //     for (let j = 0; j < arr2.length; j++) {
    //       if (Object.is(arr1[i], arr2[j])) {
    //         finds.push(arr1[i])
    //         arr2.splice(j, 1)
    //         break
    //       }
    //     }
    //   }
    //   console.log('finds ----', finds)
    //   // const sortArr1 = arr1.sort()
    //   // const sortArr2 = arr2.sort()
    //   // console.log(sortArr1, sortArr2)
    //   // sortArr1.forEach((item, index) => {
    //   //   if (!Object.is(item, sortArr2[index])) {
    //   //     isEqual = false
    //   //   }
    //   // })

    //   // console.log('equalArrays ', isEqual)
    //   if (finds.length === arr1.length) return true
    //   return false
    // }

    // // equalArrays(['1', 1, true], [true, 1, '1'])
    // console.log(equalArrays([1, 2, 3], [1, 2, 3])) // true
    // console.log(equalArrays([3, 1, 2], [3, 1, 2])) // true
    // console.log(equalArrays(['1', 1, true], [true, 1, '1'])) // true

    // console.log(equalArrays([null, null, null], [null, null, null])) // true

    // const objects = [{ x: 1 }, { x: 2 }]

    // console.log(equalArrays(objects, objects.toReversed())) // true

    // console.log(equalArrays([1, 2, 1], [2, 1, 2])) // false
    // console.log(equalArrays([1, 2, 3], [1, 2, 3, 4])) // false

    // testFF()
    // reverseString('qwerty')
    // // console.log('onMounted ', testBtnRes.value)

    // testPromise()
    // const q = Func()
    // console.log(q)
  })
  const isModal = ref(false)
  const inputValue = ref('')
</script>
<template>
  <div class="n-flex n-wp-100 n-hp-100">
    <div ref="testContainerRef" class="n-wp-100 n-p-16 n-flex n-justify-center">
      <nb-input v-model="inputValue"></nb-input>
      <Transition name="testm">
        <TestModal v-if="isModal" @close="isModal = false"></TestModal>
      </Transition>
      <nb-button @click="inputValue = ''">clearInput</nb-button>
      <nb-button @click="isModal = !isModal">modalClick</nb-button>
    </div>
  </div>
</template>

<style lang="scss">
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .testm {
    &-enter-active,
    &-leave-active {
      transition: opacity 1s ease;
    }

    &-enter-from,
    &-leave-to {
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
</style>
